#!/usr/bin/env node

/**
 * Naveeg Environment Validation Script
 * Validates all environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}=== ${msg} ===${colors.reset}`)
};

// Environment variable definitions
const envDefinitions = {
  // Core Application
  core: {
    'NEXT_PUBLIC_APP_URL': { required: true, type: 'url', description: 'Dashboard app URL' },
    'NEXT_PUBLIC_MARKETING_URL': { required: true, type: 'url', description: 'Marketing site URL' },
    'NODE_ENV': { required: true, type: 'enum', values: ['development', 'production'], description: 'Node environment' }
  },
  
  // Supabase
  supabase: {
    'NEXT_PUBLIC_SUPABASE_URL': { required: true, type: 'url', description: 'Supabase project URL' },
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': { required: true, type: 'string', minLength: 100, description: 'Supabase anonymous key' },
    'SUPABASE_SERVICE_ROLE_KEY': { required: true, type: 'string', minLength: 100, description: 'Supabase service role key' }
  },
  
  // Stripe
  stripe: {
    'STRIPE_SECRET_KEY': { required: true, type: 'string', pattern: /^sk_(test_|live_)/, description: 'Stripe secret key' },
    'STRIPE_PUBLISHABLE_KEY': { required: true, type: 'string', pattern: /^pk_(test_|live_)/, description: 'Stripe publishable key' },
    'STRIPE_WEBHOOK_SECRET': { required: true, type: 'string', pattern: /^whsec_/, description: 'Stripe webhook secret' }
  },
  
  // 10Web
  tenweb: {
    'TENWEB_API_KEY': { required: true, type: 'string', minLength: 20, description: '10Web API key' },
    'TENWEB_API_URL': { required: true, type: 'url', description: '10Web API URL' }
  },
  
  // OpenAI
  openai: {
    'OPENAI_API_KEY': { required: true, type: 'string', pattern: /^sk-/, description: 'OpenAI API key' }
  },
  
  // Google OAuth
  google: {
    'GOOGLE_CLIENT_ID': { required: true, type: 'string', minLength: 50, description: 'Google OAuth client ID' },
    'GOOGLE_CLIENT_SECRET': { required: true, type: 'string', minLength: 20, description: 'Google OAuth client secret' }
  },
  
  // N8N (Optional)
  n8n: {
    'N8N_WEBHOOK_URL': { required: false, type: 'url', description: 'N8N webhook URL' },
    'N8N_BASIC_AUTH_PASSWORD': { required: false, type: 'string', minLength: 8, description: 'N8N basic auth password' }
  },
  
  // Slack (Optional)
  slack: {
    'SLACK_WEBHOOK_URL': { required: false, type: 'url', description: 'Slack webhook URL' }
  }
};

// Validation functions
const validators = {
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  
  string: (value, minLength = 0) => {
    return typeof value === 'string' && value.length >= minLength;
  },
  
  enum: (value, allowedValues) => {
    return allowedValues.includes(value);
  },
  
  pattern: (value, regex) => {
    return regex.test(value);
  }
};

// Load environment variables from file
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

// Validate environment variables
function validateEnv(env, category, definitions) {
  const results = {
    valid: [],
    invalid: [],
    missing: []
  };
  
  Object.entries(definitions).forEach(([key, config]) => {
    const value = env[key];
    
    if (!value) {
      if (config.required) {
        results.missing.push({ key, config });
      }
      return;
    }
    
    let isValid = true;
    let error = '';
    
    // Type validation
    if (config.type === 'url') {
      isValid = validators.url(value);
      if (!isValid) error = 'Invalid URL format';
    } else if (config.type === 'string') {
      isValid = validators.string(value, config.minLength);
      if (!isValid) error = `String too short (minimum ${config.minLength} characters)`;
    } else if (config.type === 'enum') {
      isValid = validators.enum(value, config.values);
      if (!isValid) error = `Invalid value. Must be one of: ${config.values.join(', ')}`;
    }
    
    // Pattern validation
    if (isValid && config.pattern) {
      isValid = validators.pattern(value, config.pattern);
      if (!isValid) error = 'Invalid format';
    }
    
    if (isValid) {
      results.valid.push({ key, config, value });
    } else {
      results.invalid.push({ key, config, value, error });
    }
  });
  
  return results;
}

// Main validation function
function validateAllEnvironments() {
  log.header('Naveeg Environment Validation');
  
  const envFiles = [
    { path: '.env.local', name: 'Root Environment' },
    { path: 'apps/marketing/.env.local', name: 'Marketing App' },
    { path: 'apps/dashboard/.env.local', name: 'Dashboard App' },
    { path: 'n8n/.env', name: 'N8N Configuration' }
  ];
  
  let totalValid = 0;
  let totalInvalid = 0;
  let totalMissing = 0;
  
  envFiles.forEach(({ path: filePath, name }) => {
    log.info(`Validating ${name} (${filePath})`);
    
    const env = loadEnvFile(filePath);
    
    Object.entries(envDefinitions).forEach(([category, definitions]) => {
      const results = validateEnv(env, category, definitions);
      
      results.valid.forEach(({ key, config }) => {
        log.success(`  ✓ ${key}: ${config.description}`);
        totalValid++;
      });
      
      results.invalid.forEach(({ key, config, error }) => {
        log.error(`  ✗ ${key}: ${error}`);
        totalInvalid++;
      });
      
      results.missing.forEach(({ key, config }) => {
        if (config.required) {
          log.warning(`  ? ${key}: ${config.description} (MISSING)`);
          totalMissing++;
        }
      });
    });
    
    console.log('');
  });
  
  // Summary
  log.header('Validation Summary');
  log.info(`Valid variables: ${totalValid}`);
  log.warning(`Invalid variables: ${totalInvalid}`);
  log.error(`Missing required variables: ${totalMissing}`);
  
  if (totalInvalid === 0 && totalMissing === 0) {
    log.success('All environment variables are properly configured!');
    process.exit(0);
  } else {
    log.error('Environment validation failed. Please fix the issues above.');
    process.exit(1);
  }
}

// Run validation
if (require.main === module) {
  validateAllEnvironments();
}

module.exports = { validateAllEnvironments, loadEnvFile, validateEnv };
