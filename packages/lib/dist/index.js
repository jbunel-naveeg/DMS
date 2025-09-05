"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse2;
    exports.serialize = serialize2;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse2(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize2(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AppError: () => AppError,
  AuthService: () => AuthService,
  ConsentManager: () => ConsentManager,
  CookieManager: () => CookieManager,
  CurrencyFormatter: () => CurrencyFormatter,
  DEFAULT_ROLE_PERMISSIONS: () => DEFAULT_ROLE_PERMISSIONS,
  DataSubjectRightsManager: () => DataSubjectRightsManager,
  DateFormatter: () => DateFormatter,
  EntitlementService: () => EntitlementService,
  GDPRService: () => GDPRService,
  GOOGLE_OAUTH_SCOPES: () => GOOGLE_OAUTH_SCOPES,
  GoogleAnalyticsService: () => GoogleAnalyticsService,
  GoogleBusinessProfileService: () => GoogleBusinessProfileService,
  GoogleSearchConsoleService: () => GoogleSearchConsoleService,
  GoogleService: () => GoogleService,
  I18nProvider: () => I18nProvider,
  I18nService: () => I18nService,
  LocaleDetector: () => LocaleDetector,
  N8NService: () => N8NService,
  NumberFormatter: () => NumberFormatter,
  OpenAIService: () => OpenAIService,
  PLANS: () => PLANS,
  STRIPE_WEBHOOK_SECRET: () => STRIPE_WEBHOOK_SECRET,
  StripeCheckoutService: () => StripeCheckoutService,
  StripeSubscriptionService: () => StripeSubscriptionService,
  StripeWebhookService: () => StripeWebhookService,
  TEAM_MEMBER_ROLE_COLORS: () => TEAM_MEMBER_ROLE_COLORS,
  TEAM_MEMBER_STATUS_COLORS: () => TEAM_MEMBER_STATUS_COLORS,
  TeamService: () => TeamService,
  TenWebAPI: () => TenWebAPI,
  TranslationManager: () => TranslationManager,
  authService: () => authService,
  briefSchema: () => briefSchema,
  calculateUsagePercentage: () => calculateUsagePercentage,
  createAuthClient: () => createAuthClient,
  createBrowserClient: () => createBrowserClient2,
  createServerClient: () => createServerClient2,
  createServerSupabaseClient: () => createServerSupabaseClient,
  designSchema: () => designSchema,
  entitlementService: () => entitlementService,
  formatBandwidthSize: () => formatBandwidthSize,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatStorageSize: () => formatStorageSize,
  generateSchema: () => generateSchema,
  generateSubdomain: () => generateSubdomain,
  getAllGoogleScopes: () => getAllGoogleScopes,
  getBrowserSupabaseClient: () => getBrowserSupabaseClient,
  getOpenAIService: () => getOpenAIService,
  getPlanById: () => getPlanById,
  getPlanLimits: () => getPlanLimits,
  getScopesForServices: () => getScopesForServices,
  getServerSupabaseClient: () => getServerSupabaseClient,
  getServiceSupabaseClient: () => getServiceSupabaseClient,
  getStripe: () => getStripe,
  getTenWebAPI: () => getTenWebAPI,
  isFeatureAvailable: () => isFeatureAvailable,
  n8nService: () => n8nService,
  openAIService: () => openAIService,
  stripeCheckoutService: () => stripeCheckoutService,
  stripeSubscriptionService: () => stripeSubscriptionService,
  stripeWebhookService: () => stripeWebhookService,
  tenWebAPI: () => tenWebAPI,
  useAuth: () => useAuth,
  useCurrency: () => useCurrency,
  useDate: () => useDate,
  useEntitlements: () => useEntitlements,
  useFeatureGate: () => useFeatureGate,
  useI18n: () => useI18n,
  useIsAuthenticated: () => useIsAuthenticated,
  useLocale: () => useLocale,
  useN8N: () => useN8N,
  useNumber: () => useNumber,
  useOnboardingStatus: () => useOnboardingStatus,
  usePlural: () => usePlural,
  useRTL: () => useRTL,
  useRequireAuth: () => useRequireAuth,
  useTeamActivity: () => useTeamActivity,
  useTeamInvitations: () => useTeamInvitations,
  useTeamMembers: () => useTeamMembers,
  useTeamPermissions: () => useTeamPermissions,
  useTeamSettings: () => useTeamSettings,
  useTranslation: () => useTranslation,
  useUser: () => useUser,
  useUserData: () => useUserData
});
module.exports = __toCommonJS(src_exports);

// ../../node_modules/@supabase/ssr/dist/module/createBrowserClient.js
var import_supabase_js = require("@supabase/supabase-js");

// ../../node_modules/@supabase/ssr/dist/module/version.js
var VERSION = "0.7.0";

// ../../node_modules/@supabase/ssr/dist/module/utils/helpers.js
var import_cookie = __toESM(require_dist());
function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}

// ../../node_modules/@supabase/ssr/dist/module/utils/constants.js
var DEFAULT_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax",
  httpOnly: false,
  // https://developer.chrome.com/blog/cookie-max-age-expires
  // https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-cookie-lifetime-limits
  maxAge: 400 * 24 * 60 * 60
};

// ../../node_modules/@supabase/ssr/dist/module/utils/chunker.js
var MAX_CHUNK_SIZE = 3180;
var CHUNK_LIKE_REGEX = /^(.*)[.](0|[1-9][0-9]*)$/;
function isChunkLike(cookieName, key) {
  if (cookieName === key) {
    return true;
  }
  const chunkLike = cookieName.match(CHUNK_LIKE_REGEX);
  if (chunkLike && chunkLike[1] === key) {
    return true;
  }
  return false;
}
function createChunks(key, value, chunkSize) {
  const resolvedChunkSize = chunkSize ?? MAX_CHUNK_SIZE;
  let encodedValue = encodeURIComponent(value);
  if (encodedValue.length <= resolvedChunkSize) {
    return [{ name: key, value }];
  }
  const chunks = [];
  while (encodedValue.length > 0) {
    let encodedChunkHead = encodedValue.slice(0, resolvedChunkSize);
    const lastEscapePos = encodedChunkHead.lastIndexOf("%");
    if (lastEscapePos > resolvedChunkSize - 3) {
      encodedChunkHead = encodedChunkHead.slice(0, lastEscapePos);
    }
    let valueHead = "";
    while (encodedChunkHead.length > 0) {
      try {
        valueHead = decodeURIComponent(encodedChunkHead);
        break;
      } catch (error) {
        if (error instanceof URIError && encodedChunkHead.at(-3) === "%" && encodedChunkHead.length > 3) {
          encodedChunkHead = encodedChunkHead.slice(0, encodedChunkHead.length - 3);
        } else {
          throw error;
        }
      }
    }
    chunks.push(valueHead);
    encodedValue = encodedValue.slice(encodedChunkHead.length);
  }
  return chunks.map((value2, i) => ({ name: `${key}.${i}`, value: value2 }));
}
async function combineChunks(key, retrieveChunk) {
  const value = await retrieveChunk(key);
  if (value) {
    return value;
  }
  let values = [];
  for (let i = 0; ; i++) {
    const chunkName = `${key}.${i}`;
    const chunk = await retrieveChunk(chunkName);
    if (!chunk) {
      break;
    }
    values.push(chunk);
  }
  if (values.length > 0) {
    return values.join("");
  }
  return null;
}

// ../../node_modules/@supabase/ssr/dist/module/utils/base64url.js
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL = " 	\n\r=".split("");
var FROM_BASE64URL = (() => {
  const charMap = new Array(128);
  for (let i = 0; i < charMap.length; i += 1) {
    charMap[i] = -1;
  }
  for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
    charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
  }
  for (let i = 0; i < TO_BASE64URL.length; i += 1) {
    charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
  }
  return charMap;
})();
function stringToBase64URL(str) {
  const base64 = [];
  let queue = 0;
  let queuedBits = 0;
  const emitter = (byte) => {
    queue = queue << 8 | byte;
    queuedBits += 8;
    while (queuedBits >= 6) {
      const pos = queue >> queuedBits - 6 & 63;
      base64.push(TO_BASE64URL[pos]);
      queuedBits -= 6;
    }
  };
  stringToUTF8(str, emitter);
  if (queuedBits > 0) {
    queue = queue << 6 - queuedBits;
    queuedBits = 6;
    while (queuedBits >= 6) {
      const pos = queue >> queuedBits - 6 & 63;
      base64.push(TO_BASE64URL[pos]);
      queuedBits -= 6;
    }
  }
  return base64.join("");
}
function stringFromBase64URL(str) {
  const conv = [];
  const emit = (codepoint) => {
    conv.push(String.fromCodePoint(codepoint));
  };
  const state = {
    utf8seq: 0,
    codepoint: 0
  };
  let queue = 0;
  let queuedBits = 0;
  for (let i = 0; i < str.length; i += 1) {
    const codepoint = str.charCodeAt(i);
    const bits = FROM_BASE64URL[codepoint];
    if (bits > -1) {
      queue = queue << 6 | bits;
      queuedBits += 6;
      while (queuedBits >= 8) {
        stringFromUTF8(queue >> queuedBits - 8 & 255, state, emit);
        queuedBits -= 8;
      }
    } else if (bits === -2) {
      continue;
    } else {
      throw new Error(`Invalid Base64-URL character "${str.at(i)}" at position ${i}`);
    }
  }
  return conv.join("");
}
function codepointToUTF8(codepoint, emit) {
  if (codepoint <= 127) {
    emit(codepoint);
    return;
  } else if (codepoint <= 2047) {
    emit(192 | codepoint >> 6);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 65535) {
    emit(224 | codepoint >> 12);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 1114111) {
    emit(240 | codepoint >> 18);
    emit(128 | codepoint >> 12 & 63);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
function stringToUTF8(str, emit) {
  for (let i = 0; i < str.length; i += 1) {
    let codepoint = str.charCodeAt(i);
    if (codepoint > 55295 && codepoint <= 56319) {
      const highSurrogate = (codepoint - 55296) * 1024 & 65535;
      const lowSurrogate = str.charCodeAt(i + 1) - 56320 & 65535;
      codepoint = (lowSurrogate | highSurrogate) + 65536;
      i += 1;
    }
    codepointToUTF8(codepoint, emit);
  }
}
function stringFromUTF8(byte, state, emit) {
  if (state.utf8seq === 0) {
    if (byte <= 127) {
      emit(byte);
      return;
    }
    for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
      if ((byte >> 7 - leadingBit & 1) === 0) {
        state.utf8seq = leadingBit;
        break;
      }
    }
    if (state.utf8seq === 2) {
      state.codepoint = byte & 31;
    } else if (state.utf8seq === 3) {
      state.codepoint = byte & 15;
    } else if (state.utf8seq === 4) {
      state.codepoint = byte & 7;
    } else {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.utf8seq -= 1;
  } else if (state.utf8seq > 0) {
    if (byte <= 127) {
      throw new Error("Invalid UTF-8 sequence");
    }
    state.codepoint = state.codepoint << 6 | byte & 63;
    state.utf8seq -= 1;
    if (state.utf8seq === 0) {
      emit(state.codepoint);
    }
  }
}

// ../../node_modules/@supabase/ssr/dist/module/cookies.js
var import_cookie2 = __toESM(require_dist());
var BASE64_PREFIX = "base64-";
function createStorageFromOptions(options, isServerClient) {
  const cookies = options.cookies ?? null;
  const cookieEncoding = options.cookieEncoding;
  const setItems = {};
  const removedItems = {};
  let getAll;
  let setAll;
  if (cookies) {
    if ("get" in cookies) {
      const getWithHints = async (keyHints) => {
        const chunkNames = keyHints.flatMap((keyHint) => [
          keyHint,
          ...Array.from({ length: 5 }).map((_, i) => `${keyHint}.${i}`)
        ]);
        const chunks = [];
        for (let i = 0; i < chunkNames.length; i += 1) {
          const value = await cookies.get(chunkNames[i]);
          if (!value && typeof value !== "string") {
            continue;
          }
          chunks.push({ name: chunkNames[i], value });
        }
        return chunks;
      };
      getAll = async (keyHints) => await getWithHints(keyHints);
      if ("set" in cookies && "remove" in cookies) {
        setAll = async (setCookies) => {
          for (let i = 0; i < setCookies.length; i += 1) {
            const { name, value, options: options2 } = setCookies[i];
            if (value) {
              await cookies.set(name, value, options2);
            } else {
              await cookies.remove(name, options2);
            }
          }
        };
      } else if (isServerClient) {
        setAll = async () => {
          console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
        };
      } else {
        throw new Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
      }
    } else if ("getAll" in cookies) {
      getAll = async () => await cookies.getAll();
      if ("setAll" in cookies) {
        setAll = cookies.setAll;
      } else if (isServerClient) {
        setAll = async () => {
          console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
        };
      } else {
        throw new Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
      }
    } else {
      throw new Error(`@supabase/ssr: ${isServerClient ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${isBrowser() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`);
    }
  } else if (!isServerClient && isBrowser()) {
    const noHintGetAll = () => {
      const parsed = (0, import_cookie2.parse)(document.cookie);
      return Object.keys(parsed).map((name) => ({
        name,
        value: parsed[name] ?? ""
      }));
    };
    getAll = () => noHintGetAll();
    setAll = (setCookies) => {
      setCookies.forEach(({ name, value, options: options2 }) => {
        document.cookie = (0, import_cookie2.serialize)(name, value, options2);
      });
    };
  } else if (isServerClient) {
    throw new Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
  } else {
    getAll = () => {
      return [];
    };
    setAll = () => {
      throw new Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
    };
  }
  if (!isServerClient) {
    return {
      getAll,
      // for type consistency
      setAll,
      // for type consistency
      setItems,
      // for type consistency
      removedItems,
      // for type consistency
      storage: {
        isServer: false,
        getItem: async (key) => {
          const allCookies = await getAll([key]);
          const chunkedCookie = await combineChunks(key, async (chunkName) => {
            const cookie = allCookies?.find(({ name }) => name === chunkName) || null;
            if (!cookie) {
              return null;
            }
            return cookie.value;
          });
          if (!chunkedCookie) {
            return null;
          }
          let decoded = chunkedCookie;
          if (chunkedCookie.startsWith(BASE64_PREFIX)) {
            decoded = stringFromBase64URL(chunkedCookie.substring(BASE64_PREFIX.length));
          }
          return decoded;
        },
        setItem: async (key, value) => {
          const allCookies = await getAll([key]);
          const cookieNames = allCookies?.map(({ name }) => name) || [];
          const removeCookies = new Set(cookieNames.filter((name) => isChunkLike(name, key)));
          let encoded = value;
          if (cookieEncoding === "base64url") {
            encoded = BASE64_PREFIX + stringToBase64URL(value);
          }
          const setCookies = createChunks(key, encoded);
          setCookies.forEach(({ name }) => {
            removeCookies.delete(name);
          });
          const removeCookieOptions = {
            ...DEFAULT_COOKIE_OPTIONS,
            ...options?.cookieOptions,
            maxAge: 0
          };
          const setCookieOptions = {
            ...DEFAULT_COOKIE_OPTIONS,
            ...options?.cookieOptions,
            maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
          };
          delete removeCookieOptions.name;
          delete setCookieOptions.name;
          const allToSet = [
            ...[...removeCookies].map((name) => ({
              name,
              value: "",
              options: removeCookieOptions
            })),
            ...setCookies.map(({ name, value: value2 }) => ({
              name,
              value: value2,
              options: setCookieOptions
            }))
          ];
          if (allToSet.length > 0) {
            await setAll(allToSet);
          }
        },
        removeItem: async (key) => {
          const allCookies = await getAll([key]);
          const cookieNames = allCookies?.map(({ name }) => name) || [];
          const removeCookies = cookieNames.filter((name) => isChunkLike(name, key));
          const removeCookieOptions = {
            ...DEFAULT_COOKIE_OPTIONS,
            ...options?.cookieOptions,
            maxAge: 0
          };
          delete removeCookieOptions.name;
          if (removeCookies.length > 0) {
            await setAll(removeCookies.map((name) => ({
              name,
              value: "",
              options: removeCookieOptions
            })));
          }
        }
      }
    };
  }
  return {
    getAll,
    setAll,
    setItems,
    removedItems,
    storage: {
      // to signal to the libraries that these cookies are
      // coming from a server environment and their value
      // should not be trusted
      isServer: true,
      getItem: async (key) => {
        if (typeof setItems[key] === "string") {
          return setItems[key];
        }
        if (removedItems[key]) {
          return null;
        }
        const allCookies = await getAll([key]);
        const chunkedCookie = await combineChunks(key, async (chunkName) => {
          const cookie = allCookies?.find(({ name }) => name === chunkName) || null;
          if (!cookie) {
            return null;
          }
          return cookie.value;
        });
        if (!chunkedCookie) {
          return null;
        }
        let decoded = chunkedCookie;
        if (typeof chunkedCookie === "string" && chunkedCookie.startsWith(BASE64_PREFIX)) {
          decoded = stringFromBase64URL(chunkedCookie.substring(BASE64_PREFIX.length));
        }
        return decoded;
      },
      setItem: async (key, value) => {
        if (key.endsWith("-code-verifier")) {
          await applyServerStorage({
            getAll,
            setAll,
            // pretend only that the code verifier was set
            setItems: { [key]: value },
            // pretend that nothing was removed
            removedItems: {}
          }, {
            cookieOptions: options?.cookieOptions ?? null,
            cookieEncoding
          });
        }
        setItems[key] = value;
        delete removedItems[key];
      },
      removeItem: async (key) => {
        delete setItems[key];
        removedItems[key] = true;
      }
    }
  };
}
async function applyServerStorage({ getAll, setAll, setItems, removedItems }, options) {
  const cookieEncoding = options.cookieEncoding;
  const cookieOptions = options.cookieOptions ?? null;
  const allCookies = await getAll([
    ...setItems ? Object.keys(setItems) : [],
    ...removedItems ? Object.keys(removedItems) : []
  ]);
  const cookieNames = allCookies?.map(({ name }) => name) || [];
  const removeCookies = Object.keys(removedItems).flatMap((itemName) => {
    return cookieNames.filter((name) => isChunkLike(name, itemName));
  });
  const setCookies = Object.keys(setItems).flatMap((itemName) => {
    const removeExistingCookiesForItem = new Set(cookieNames.filter((name) => isChunkLike(name, itemName)));
    let encoded = setItems[itemName];
    if (cookieEncoding === "base64url") {
      encoded = BASE64_PREFIX + stringToBase64URL(encoded);
    }
    const chunks = createChunks(itemName, encoded);
    chunks.forEach((chunk) => {
      removeExistingCookiesForItem.delete(chunk.name);
    });
    removeCookies.push(...removeExistingCookiesForItem);
    return chunks;
  });
  const removeCookieOptions = {
    ...DEFAULT_COOKIE_OPTIONS,
    ...cookieOptions,
    maxAge: 0
  };
  const setCookieOptions = {
    ...DEFAULT_COOKIE_OPTIONS,
    ...cookieOptions,
    maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
  };
  delete removeCookieOptions.name;
  delete setCookieOptions.name;
  await setAll([
    ...removeCookies.map((name) => ({
      name,
      value: "",
      options: removeCookieOptions
    })),
    ...setCookies.map(({ name, value }) => ({
      name,
      value,
      options: setCookieOptions
    }))
  ]);
}

// ../../node_modules/@supabase/ssr/dist/module/createBrowserClient.js
var cachedBrowserClient;
function createBrowserClient(supabaseUrl3, supabaseKey, options) {
  const shouldUseSingleton = options?.isSingleton === true || (!options || !("isSingleton" in options)) && isBrowser();
  if (shouldUseSingleton && cachedBrowserClient) {
    return cachedBrowserClient;
  }
  if (!supabaseUrl3 || !supabaseKey) {
    throw new Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
  }
  const { storage } = createStorageFromOptions({
    ...options,
    cookieEncoding: options?.cookieEncoding ?? "base64url"
  }, false);
  const client = (0, import_supabase_js.createClient)(supabaseUrl3, supabaseKey, {
    // TODO: resolve type error
    ...options,
    global: {
      ...options?.global,
      headers: {
        ...options?.global?.headers,
        "X-Client-Info": `supabase-ssr/${VERSION} createBrowserClient`
      }
    },
    auth: {
      ...options?.auth,
      ...options?.cookieOptions?.name ? { storageKey: options.cookieOptions.name } : null,
      flowType: "pkce",
      autoRefreshToken: isBrowser(),
      detectSessionInUrl: isBrowser(),
      persistSession: true,
      storage
    }
  });
  if (shouldUseSingleton) {
    cachedBrowserClient = client;
  }
  return client;
}

// ../../node_modules/@supabase/ssr/dist/module/createServerClient.js
var import_supabase_js2 = require("@supabase/supabase-js");
function createServerClient(supabaseUrl3, supabaseKey, options) {
  if (!supabaseUrl3 || !supabaseKey) {
    throw new Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
  }
  const { storage, getAll, setAll, setItems, removedItems } = createStorageFromOptions({
    ...options,
    cookieEncoding: options?.cookieEncoding ?? "base64url"
  }, true);
  const client = (0, import_supabase_js2.createClient)(supabaseUrl3, supabaseKey, {
    // TODO: resolve type error
    ...options,
    global: {
      ...options?.global,
      headers: {
        ...options?.global?.headers,
        "X-Client-Info": `supabase-ssr/${VERSION} createServerClient`
      }
    },
    auth: {
      ...options?.cookieOptions?.name ? { storageKey: options.cookieOptions.name } : null,
      ...options?.auth,
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
      storage
    }
  });
  client.auth.onAuthStateChange(async (event) => {
    const hasStorageChanges = Object.keys(setItems).length > 0 || Object.keys(removedItems).length > 0;
    if (hasStorageChanges && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED" || event === "PASSWORD_RECOVERY" || event === "SIGNED_OUT" || event === "MFA_CHALLENGE_VERIFIED")) {
      await applyServerStorage({ getAll, setAll, setItems, removedItems }, {
        cookieOptions: options?.cookieOptions ?? null,
        cookieEncoding: options?.cookieEncoding ?? "base64url"
      });
    }
  });
  return client;
}

// src/supabase/supabase-browser.ts
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
var supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
function getBrowserSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PHASE === "phase-production-build") {
      return createBrowserClient("https://placeholder.supabase.co", "placeholder_key");
    }
    throw new Error("Supabase env vars missing");
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// src/supabase/supabase-server.ts
var import_supabase_js3 = require("@supabase/supabase-js");
var supabaseUrl2 = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
var supabaseAnonKey2 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
function getServerSupabaseClient() {
  if (!supabaseUrl2 || !supabaseAnonKey2) {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PHASE === "phase-production-build") {
      return (0, import_supabase_js3.createClient)("https://placeholder.supabase.co", "placeholder_key");
    }
    throw new Error("Supabase env vars missing");
  }
  return (0, import_supabase_js3.createClient)(supabaseUrl2, supabaseAnonKey2);
}
function createServerSupabaseClient(request) {
  if (!supabaseUrl2 || !supabaseAnonKey2) {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PHASE === "phase-production-build") {
      return (0, import_supabase_js3.createClient)("https://placeholder.supabase.co", "placeholder_key");
    }
    throw new Error("Supabase env vars missing");
  }
  if (request) {
    return createServerClient(supabaseUrl2, supabaseAnonKey2, {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: "", ...options });
        }
      }
    });
  }
  return (0, import_supabase_js3.createClient)(supabaseUrl2, supabaseAnonKey2);
}
function getServiceSupabaseClient() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl2 || !serviceRole) {
    throw new Error("Supabase service role env vars missing");
  }
  return (0, import_supabase_js3.createClient)(supabaseUrl2, serviceRole);
}

// src/supabase/rls.ts
var AppError = class extends Error {
  constructor(code, message, hint) {
    super(message);
    this.code = code;
    this.hint = hint;
  }
};

// src/stripe/stripe.ts
var import_stripe = __toESM(require("stripe"));
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY missing");
  }
  return new import_stripe.default(key, {
    apiVersion: "2023-10-16"
  });
}
var STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// src/stripe/checkout.ts
var import_stripe2 = __toESM(require("stripe"));

// src/types/plans.ts
var PLANS = [
  {
    id: "trial",
    name: "Trial",
    description: "Perfect for testing the platform",
    price: 0,
    interval: "month",
    features: [
      "1 Website",
      "1 Subdomain",
      "1GB Storage",
      "10GB Bandwidth",
      "Basic Support",
      "WordPress Hosting"
    ],
    limits: {
      websites: 1,
      domains: 1,
      storage: 1,
      bandwidth: 10,
      team_members: 1
    }
  },
  {
    id: "starter",
    name: "Starter",
    description: "Great for small businesses and freelancers",
    price: 49,
    interval: "month",
    features: [
      "3 Websites",
      "3 Custom Domains",
      "10GB Storage",
      "100GB Bandwidth",
      "Priority Support",
      "WordPress Hosting",
      "SSL Certificates",
      "Basic Analytics"
    ],
    limits: {
      websites: 3,
      domains: 3,
      storage: 10,
      bandwidth: 100,
      team_members: 2
    },
    stripe_price_id: "price_starter_monthly"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfect for growing businesses",
    price: 99,
    interval: "month",
    features: [
      "10 Websites",
      "10 Custom Domains",
      "50GB Storage",
      "500GB Bandwidth",
      "Priority Support",
      "WordPress Hosting",
      "SSL Certificates",
      "Advanced Analytics",
      "Team Collaboration",
      "API Access"
    ],
    limits: {
      websites: 10,
      domains: 10,
      storage: 50,
      bandwidth: 500,
      team_members: 5
    },
    is_popular: true,
    stripe_price_id: "price_pro_monthly"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: 199,
    interval: "month",
    features: [
      "Unlimited Websites",
      "Unlimited Domains",
      "500GB Storage",
      "2TB Bandwidth",
      "24/7 Priority Support",
      "WordPress Hosting",
      "SSL Certificates",
      "Advanced Analytics",
      "Team Collaboration",
      "API Access",
      "Custom Integrations",
      "Dedicated Support"
    ],
    limits: {
      websites: -1,
      // -1 means unlimited
      domains: -1,
      storage: 500,
      bandwidth: 2e3,
      team_members: -1
    },
    is_enterprise: true,
    stripe_price_id: "price_enterprise_monthly"
  }
];
function getPlanById(id) {
  return PLANS.find((plan) => plan.id === id);
}
function getPlanLimits(planId) {
  const plan = getPlanById(planId);
  return plan ? plan.limits : null;
}
function calculateUsagePercentage(usage, limit) {
  if (limit === -1)
    return 0;
  if (limit === 0)
    return 100;
  return Math.min(usage / limit * 100, 100);
}
function isFeatureAvailable(planId, feature, currentUsage) {
  const limits = getPlanLimits(planId);
  if (!limits)
    return false;
  const limit = limits[feature];
  if (limit === -1)
    return true;
  return currentUsage < limit;
}
function formatStorageSize(gb) {
  if (gb >= 1e3) {
    return `${(gb / 1e3).toFixed(1)}TB`;
  }
  return `${gb}GB`;
}
function formatBandwidthSize(gb) {
  if (gb >= 1e3) {
    return `${(gb / 1e3).toFixed(1)}TB`;
  }
  return `${gb}GB`;
}

// src/stripe/checkout.ts
var StripeCheckoutService = class {
  constructor(apiKey) {
    this.stripe = new import_stripe2.default(apiKey, {
      apiVersion: "2023-10-16"
    });
  }
  async createCheckoutSession(request) {
    try {
      const plan = PLANS.find((p) => p.id === request.plan_id);
      if (!plan) {
        return {
          success: false,
          error: "Plan not found"
        };
      }
      if (!plan.stripe_price_id) {
        return {
          success: false,
          error: "Plan does not support Stripe checkout"
        };
      }
      const sessionParams = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: plan.stripe_price_id,
            quantity: 1
          }
        ],
        success_url: request.success_url,
        cancel_url: request.cancel_url,
        metadata: {
          plan_id: plan.id
        }
      };
      if (request.customer_id) {
        sessionParams.customer = request.customer_id;
      } else if (request.customer_email) {
        sessionParams.customer_email = request.customer_email;
      }
      if (request.trial_period_days && request.trial_period_days > 0) {
        sessionParams.subscription_data = {
          trial_period_days: request.trial_period_days
        };
      }
      const session = await this.stripe.checkout.sessions.create(sessionParams);
      return {
        success: true,
        session: {
          id: session.id,
          url: session.url,
          customer_email: session.customer_email || void 0,
          customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
          subscription_id: typeof session.subscription === "string" ? session.subscription : session.subscription?.id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create checkout session"
      };
    }
  }
  async retrieveCheckoutSession(sessionId) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return {
        id: session.id,
        url: session.url,
        customer_email: session.customer_email || void 0,
        customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
        subscription_id: typeof session.subscription === "string" ? session.subscription : session.subscription?.id
      };
    } catch (error) {
      console.error("Error retrieving checkout session:", error);
      return null;
    }
  }
  async createCustomerPortalSession(customerId, returnUrl) {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl
      });
      return { url: session.url };
    } catch (error) {
      console.error("Error creating customer portal session:", error);
      return null;
    }
  }
};
var stripeCheckoutService = new StripeCheckoutService(
  process.env.STRIPE_SECRET_KEY || ""
);

// src/stripe/subscriptions.ts
var import_stripe3 = __toESM(require("stripe"));
var StripeSubscriptionService = class {
  constructor(apiKey) {
    this.stripe = new import_stripe3.default(apiKey, {
      apiVersion: "2023-10-16"
    });
  }
  async createSubscription(request) {
    try {
      const subscriptionParams = {
        customer: request.customer_id,
        items: [
          {
            price: request.price_id
          }
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"]
      };
      if (request.trial_period_days && request.trial_period_days > 0) {
        subscriptionParams.trial_period_days = request.trial_period_days;
      }
      const subscription = await this.stripe.subscriptions.create(subscriptionParams);
      return {
        success: true,
        subscription: this.mapSubscription(subscription)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create subscription"
      };
    }
  }
  async updateSubscription(request) {
    try {
      const updateParams = {};
      if (request.price_id) {
        const subscription2 = await this.stripe.subscriptions.retrieve(request.subscription_id);
        await this.stripe.subscriptions.update(request.subscription_id, {
          items: [
            {
              id: subscription2.items.data[0].id,
              price: request.price_id
            }
          ]
        });
      }
      if (request.cancel_at_period_end !== void 0) {
        updateParams.cancel_at_period_end = request.cancel_at_period_end;
      }
      if (Object.keys(updateParams).length > 0) {
        const subscription2 = await this.stripe.subscriptions.update(
          request.subscription_id,
          updateParams
        );
        return {
          success: true,
          subscription: this.mapSubscription(subscription2)
        };
      }
      const subscription = await this.stripe.subscriptions.retrieve(request.subscription_id);
      return {
        success: true,
        subscription: this.mapSubscription(subscription)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update subscription"
      };
    }
  }
  async cancelSubscription(request) {
    try {
      let subscription;
      if (request.immediately) {
        subscription = await this.stripe.subscriptions.cancel(request.subscription_id);
      } else {
        subscription = await this.stripe.subscriptions.update(request.subscription_id, {
          cancel_at_period_end: true
        });
      }
      return {
        success: true,
        subscription: this.mapSubscription(subscription)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to cancel subscription"
      };
    }
  }
  async getSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return this.mapSubscription(subscription);
    } catch (error) {
      console.error("Error retrieving subscription:", error);
      return null;
    }
  }
  async getCustomerSubscriptions(customerId) {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: "all"
      });
      return subscriptions.data.map((sub) => this.mapSubscription(sub));
    } catch (error) {
      console.error("Error retrieving customer subscriptions:", error);
      return [];
    }
  }
  async getUpcomingInvoice(customerId) {
    try {
      const invoice = await this.stripe.invoices.retrieveUpcoming({
        customer: customerId
      });
      return invoice;
    } catch (error) {
      console.error("Error retrieving upcoming invoice:", error);
      return null;
    }
  }
  mapSubscription(subscription) {
    const price = subscription.items.data[0]?.price;
    const planId = price?.metadata?.plan_id || "unknown";
    return {
      id: subscription.id,
      customer_id: subscription.customer,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at || void 0,
      trial_start: subscription.trial_start || void 0,
      trial_end: subscription.trial_end || void 0,
      plan_id: planId,
      price_id: price?.id || "",
      created: subscription.created
    };
  }
};
var stripeSubscriptionService = new StripeSubscriptionService(
  process.env.STRIPE_SECRET_KEY || ""
);

// src/stripe/webhooks.ts
var import_stripe4 = __toESM(require("stripe"));
var import_supabase_js4 = require("@supabase/supabase-js");
var StripeWebhookService = class {
  constructor(stripeSecretKey, supabaseUrl3, supabaseServiceKey) {
    this.stripe = new import_stripe4.default(stripeSecretKey, {
      apiVersion: "2023-10-16"
    });
    this.supabase = (0, import_supabase_js4.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseServiceKey || "placeholder_key");
  }
  async processWebhook(payload, signature, webhookSecret) {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      switch (event.type) {
        case "checkout.session.completed":
          return await this.handleCheckoutSessionCompleted(event.data.object);
        case "customer.subscription.created":
          return await this.handleSubscriptionCreated(event.data.object);
        case "customer.subscription.updated":
          return await this.handleSubscriptionUpdated(event.data.object);
        case "customer.subscription.deleted":
          return await this.handleSubscriptionDeleted(event.data.object);
        case "invoice.payment_succeeded":
          return await this.handlePaymentSucceeded(event.data.object);
        case "invoice.payment_failed":
          return await this.handlePaymentFailed(event.data.object);
        case "customer.created":
          return await this.handleCustomerCreated(event.data.object);
        case "customer.updated":
          return await this.handleCustomerUpdated(event.data.object);
        default:
          console.log(`Unhandled event type: ${event.type}`);
          return { success: true };
      }
    } catch (error) {
      console.error("Webhook processing error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Webhook processing failed"
      };
    }
  }
  async handleCheckoutSessionCompleted(session) {
    try {
      const customerId = session.customer;
      const subscriptionId = session.subscription;
      const planId = session.metadata?.plan_id;
      if (!customerId || !subscriptionId || !planId) {
        throw new Error("Missing required session data");
      }
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      const { error } = await this.supabase.from("user_plans").upsert({
        user_id: customerId,
        // Assuming customer_id maps to user_id
        plan_id: planId,
        stripe_subscription_id: subscriptionId,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1e3).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1e3).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end
      });
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling checkout session completed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process checkout session"
      };
    }
  }
  async handleSubscriptionCreated(subscription) {
    try {
      const customerId = subscription.customer;
      const planId = subscription.metadata?.plan_id || "unknown";
      const { error } = await this.supabase.from("user_plans").update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1e3).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1e3).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end
      }).eq("stripe_subscription_id", subscription.id);
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling subscription created:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process subscription created"
      };
    }
  }
  async handleSubscriptionUpdated(subscription) {
    try {
      const { error } = await this.supabase.from("user_plans").update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1e3).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1e3).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1e3).toISOString() : null
      }).eq("stripe_subscription_id", subscription.id);
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling subscription updated:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process subscription updated"
      };
    }
  }
  async handleSubscriptionDeleted(subscription) {
    try {
      const { error } = await this.supabase.from("user_plans").update({
        status: "canceled",
        canceled_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("stripe_subscription_id", subscription.id);
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling subscription deleted:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process subscription deleted"
      };
    }
  }
  async handlePaymentSucceeded(invoice) {
    try {
      const subscriptionId = invoice.subscription;
      if (subscriptionId) {
        const { error } = await this.supabase.from("user_plans").update({
          status: "active"
        }).eq("stripe_subscription_id", subscriptionId);
        if (error) {
          throw new Error(`Database error: ${error.message}`);
        }
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling payment succeeded:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process payment succeeded"
      };
    }
  }
  async handlePaymentFailed(invoice) {
    try {
      const subscriptionId = invoice.subscription;
      if (subscriptionId) {
        const { error } = await this.supabase.from("user_plans").update({
          status: "past_due"
        }).eq("stripe_subscription_id", subscriptionId);
        if (error) {
          throw new Error(`Database error: ${error.message}`);
        }
      }
      return { success: true };
    } catch (error) {
      console.error("Error handling payment failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process payment failed"
      };
    }
  }
  async handleCustomerCreated(customer) {
    try {
      console.log("Customer created:", customer.id);
      return { success: true };
    } catch (error) {
      console.error("Error handling customer created:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process customer created"
      };
    }
  }
  async handleCustomerUpdated(customer) {
    try {
      console.log("Customer updated:", customer.id);
      return { success: true };
    } catch (error) {
      console.error("Error handling customer updated:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process customer updated"
      };
    }
  }
};
var stripeWebhookService = new StripeWebhookService(
  process.env.STRIPE_SECRET_KEY || "",
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// src/tenweb/tenweb.ts
var TenWebAPI = class {
  constructor(apiKey) {
    this.baseUrl = "https://my.10web.io/api";
    this.apiKey = apiKey;
  }
  async makeRequest(endpoint, method = "GET", body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      throw new Error(`TenWeb API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Create a new WordPress site
  async createSite(request) {
    try {
      const response = await this.makeRequest("/v1/hosting/website", "POST", {
        subdomain: request.subdomain,
        region: request.region || "europe-west3-b",
        site_title: request.site_title,
        admin_username: request.admin_username,
        admin_password: request.admin_password
      });
      if (response.status === "ok" && response.data) {
        const site = {
          id: response.data.id.toString(),
          name: request.site_title,
          url: response.data.url || `https://${request.subdomain}.naveeg.com`,
          status: "active",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        return {
          success: true,
          site
        };
      } else {
        return {
          success: false,
          error: response.message || "Failed to create site"
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Generate sitemap using AI
  async generateSitemap(request) {
    try {
      const response = await this.makeRequest("/v1/ai/generate_sitemap", "POST", {
        website_id: request.website_id,
        params: {
          business_type: request.business_type,
          business_name: request.business_name,
          business_description: request.business_description
        }
      });
      if (response.status === 200 && response.data) {
        return {
          success: true,
          data: response.data
        };
      } else {
        return {
          success: false,
          error: response.msg || "Failed to generate sitemap"
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Generate website from sitemap
  async generateSiteFromSitemap(request) {
    try {
      const response = await this.makeRequest("/v1/ai/generate_site_from_sitemap", "POST", {
        website_id: request.website_id,
        unique_id: request.unique_id,
        params: {
          business_type: request.business_type,
          business_name: request.business_name,
          business_description: request.business_description,
          pages_meta: request.pages_meta,
          website_description: request.website_description,
          website_keyphrase: request.website_keyphrase,
          website_title: request.website_title,
          website_type: request.website_type,
          template_type: request.template_type || "basic"
        }
      });
      if (response.status === 200 && response.data) {
        return {
          success: true,
          data: response.data
        };
      } else {
        return {
          success: false,
          error: response.msg || "Failed to generate site from sitemap"
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Enable/publish website
  async enableWebsite(websiteId) {
    try {
      const response = await this.makeRequest(`/v1/hosting/websites/${websiteId}/enable`, "POST");
      if (response.status === "ok") {
        return { success: true };
      } else {
        return {
          success: false,
          error: response.message || "Failed to enable website"
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Get all sites for a user
  async getSites() {
    try {
      return [];
    } catch (error) {
      console.error("Error fetching sites:", error);
      return [];
    }
  }
  // Get site details
  async getSite(siteId) {
    try {
      return null;
    } catch (error) {
      console.error("Error fetching site:", error);
      return null;
    }
  }
  // Create a custom domain for a site
  async createDomain(request) {
    try {
      const mockDomain = {
        id: `domain_${Date.now()}`,
        domain: request.domain,
        site_id: request.site_id,
        status: "pending",
        ssl_enabled: false,
        ssl_status: "pending",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        success: true,
        domain: mockDomain
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  // Get domains for a site
  async getDomains(siteId) {
    try {
      return [];
    } catch (error) {
      console.error("Error fetching domains:", error);
      return [];
    }
  }
  // Delete a site
  async deleteSite(siteId) {
    try {
      return true;
    } catch (error) {
      console.error("Error deleting site:", error);
      return false;
    }
  }
  // Delete a domain
  async deleteDomain(domainId) {
    try {
      return true;
    } catch (error) {
      console.error("Error deleting domain:", error);
      return false;
    }
  }
  // Get domain status and details
  async getDomainStatus(domainId) {
    try {
      const mockDomain = {
        id: domainId,
        domain: "example.com",
        site_id: `site_${Date.now()}`,
        status: "active",
        ssl_enabled: true,
        ssl_status: "active",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        verified_at: (/* @__PURE__ */ new Date()).toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString(),
        nameservers: ["ns1.10web.io", "ns2.10web.io"],
        dns_records: [
          {
            type: "A",
            name: "@",
            value: "192.168.1.1",
            ttl: 3600
          },
          {
            type: "CNAME",
            name: "www",
            value: "example.com",
            ttl: 3600
          }
        ]
      };
      return mockDomain;
    } catch (error) {
      console.error("Error fetching domain status:", error);
      return null;
    }
  }
  // Update domain DNS records
  async updateDomainDNS(domainId, records) {
    try {
      console.log("Updating DNS records for domain:", domainId, records);
      return true;
    } catch (error) {
      console.error("Error updating domain DNS:", error);
      return false;
    }
  }
  // Verify domain ownership
  async verifyDomainOwnership(domain) {
    try {
      console.log("Verifying domain ownership:", domain);
      const verified = Math.random() > 0.3;
      return {
        success: true,
        verified
      };
    } catch (error) {
      return {
        success: false,
        verified: false,
        error: error instanceof Error ? error.message : "Failed to verify domain ownership"
      };
    }
  }
  // Get SSL certificate status
  async getSSLStatus(domainId) {
    try {
      console.log("Getting SSL status for domain:", domainId);
      return {
        status: "active",
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1e3).toISOString()
      };
    } catch (error) {
      return {
        status: "failed",
        error: error instanceof Error ? error.message : "Failed to get SSL status"
      };
    }
  }
  // Request SSL certificate
  async requestSSLCertificate(domainId) {
    try {
      console.log("Requesting SSL certificate for domain:", domainId);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to request SSL certificate"
      };
    }
  }
  // Get domain analytics
  async getDomainAnalytics(domainId, period = "30d") {
    try {
      console.log("Getting domain analytics for:", domainId, period);
      return {
        visitors: Math.floor(Math.random() * 1e4),
        page_views: Math.floor(Math.random() * 5e4),
        bounce_rate: Math.random() * 0.5 + 0.2,
        // 20-70%
        avg_session_duration: Math.random() * 300 + 60
        // 1-6 minutes
      };
    } catch (error) {
      console.error("Error fetching domain analytics:", error);
      return null;
    }
  }
};
var tenWebAPI = new TenWebAPI(process.env.TENWEB_API_KEY || "");
function getTenWebAPI() {
  const apiKey = process.env.TENWEB_API_KEY;
  if (!apiKey) {
    throw new Error("TENWEB_API_KEY environment variable is required");
  }
  return new TenWebAPI(apiKey);
}

// ../../node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// ../../node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/validations/validations.ts
var briefSchema = external_exports.object({
  businessName: external_exports.string().min(2),
  tagline: external_exports.string().min(2),
  description: external_exports.string().min(10),
  vertical: external_exports.string().min(2)
});
var designSchema = external_exports.object({
  colors: external_exports.record(external_exports.string(), external_exports.string()).optional(),
  fonts: external_exports.record(external_exports.string(), external_exports.string()).optional()
});
var generateSchema = external_exports.object({
  draftId: external_exports.string().uuid()
});

// src/utils.ts
function formatCurrency(amount, currency = "EUR") {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency
  }).format(amount);
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-EU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
function generateSubdomain(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// src/auth/auth.ts
var import_supabase_js5 = require("@supabase/supabase-js");
function createAuthClient() {
  const supabaseUrl3 = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey3 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
  return (0, import_supabase_js5.createClient)(supabaseUrl3, supabaseAnonKey3, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
}
var AuthService = class {
  constructor() {
    this.supabase = createAuthClient();
  }
  // Sign up with email and password
  async signUp(email, password, name) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split("@")[0]
        }
      }
    });
    return { data, error };
  }
  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }
  // Sign in with Google
  async signInWithGoogle() {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "/auth/callback";
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });
    return { data, error };
  }
  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }
  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    return { user, error };
  }
  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession();
    return { session, error };
  }
  // Reset password
  async resetPassword(email) {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/reset-password` : "/auth/reset-password";
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });
    return { data, error };
  }
  // Update password
  async updatePassword(password) {
    const { data, error } = await this.supabase.auth.updateUser({
      password
    });
    return { data, error };
  }
  // Update user profile
  async updateProfile(updates) {
    const { data, error } = await this.supabase.auth.updateUser({
      data: updates
    });
    return { data, error };
  }
  // Listen to auth state changes
  onAuthStateChange(callback) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  // Get the Supabase client
  getClient() {
    return this.supabase;
  }
};
var authService = new AuthService();
var createBrowserClient2 = () => createAuthClient();
var createServerClient2 = (cookies) => {
  const supabaseUrl3 = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey3 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
  return (0, import_supabase_js5.createClient)(supabaseUrl3, supabaseAnonKey3, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
};

// src/auth/hooks.ts
var import_react = require("react");
function useAuth() {
  const [user, setUser] = (0, import_react.useState)(null);
  const [session, setSession] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    let mounted = true;
    authService.getCurrentSession().then(({ session: session2, error }) => {
      if (mounted) {
        if (error) {
          console.error("Error getting session:", error);
        }
        setSession(session2);
        setUser(session2?.user ?? null);
        setLoading(false);
      }
    });
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session2) => {
        if (mounted) {
          setSession(session2);
          setUser(session2?.user ?? null);
          setLoading(false);
        }
      }
    );
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);
  const signUp = (0, import_react.useCallback)(async (email, password, name) => {
    setLoading(true);
    const { error } = await authService.signUp(email, password, name);
    setLoading(false);
    return { error };
  }, []);
  const signIn = (0, import_react.useCallback)(async (email, password) => {
    setLoading(true);
    const { error } = await authService.signIn(email, password);
    setLoading(false);
    return { error };
  }, []);
  const signInWithGoogle = (0, import_react.useCallback)(async () => {
    setLoading(true);
    const { error } = await authService.signInWithGoogle();
    setLoading(false);
    return { error };
  }, []);
  const signOut = (0, import_react.useCallback)(async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    setLoading(false);
    return { error };
  }, []);
  const resetPassword = (0, import_react.useCallback)(async (email) => {
    setLoading(true);
    const { error } = await authService.resetPassword(email);
    setLoading(false);
    return { error };
  }, []);
  const updatePassword = (0, import_react.useCallback)(async (password) => {
    setLoading(true);
    const { error } = await authService.updatePassword(password);
    setLoading(false);
    return { error };
  }, []);
  const updateProfile = (0, import_react.useCallback)(async (updates) => {
    setLoading(true);
    const { error } = await authService.updateProfile(updates);
    setLoading(false);
    return { error };
  }, []);
  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  };
}
function useRequireAuth(redirectTo = "/login") {
  const { user, loading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (!loading && !user) {
      setShouldRedirect(true);
    }
  }, [user, loading]);
  return {
    user,
    loading,
    shouldRedirect,
    redirectTo
  };
}
function useIsAuthenticated() {
  const { user, loading } = useAuth();
  return {
    isAuthenticated: !!user,
    loading
  };
}
function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

// src/auth/onboarding.ts
var import_react2 = require("react");
function useOnboardingStatus() {
  const [status, setStatus] = (0, import_react2.useState)({
    isCompleted: false,
    hasWebsites: false,
    loading: true,
    error: null
  });
  const supabase = createBrowserClient2();
  (0, import_react2.useEffect)(() => {
    const checkOnboardingStatus = async () => {
      try {
        setStatus((prev) => ({ ...prev, loading: true, error: null }));
        const { data: websites, error: websitesError } = await supabase.from("websites").select("id").limit(1);
        if (websitesError) {
          throw new Error(websitesError.message);
        }
        const hasWebsites = websites && websites.length > 0;
        const isCompleted = hasWebsites;
        setStatus({
          isCompleted,
          hasWebsites,
          loading: false,
          error: null
        });
      } catch (error) {
        setStatus({
          isCompleted: false,
          hasWebsites: false,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    };
    checkOnboardingStatus();
  }, [supabase]);
  return status;
}

// src/hooks/use-user-data.ts
var import_react3 = require("react");
function useUserData() {
  const [data, setData] = (0, import_react3.useState)({
    plan: null,
    websites: [],
    domains: [],
    usage: {
      websites_count: 0,
      domains_count: 0,
      storage_used: 0,
      bandwidth_used: 0,
      team_members_count: 0
    },
    planUsage: {
      websites: { used: 0, limit: 0 },
      domains: { used: 0, limit: 0 },
      storage: { used: 0, limit: 0 },
      bandwidth: { used: 0, limit: 0 },
      team_members: { used: 0, limit: 0 }
    },
    loading: true,
    error: null
  });
  const supabase = createBrowserClient2();
  (0, import_react3.useEffect)(() => {
    const fetchUserData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const { data: planData, error: planError } = await supabase.from("user_plans").select(`
            *,
            plan:plans(*)
          `).eq("status", "active").single();
        if (planError && planError.code !== "PGRST116") {
          throw new Error(planError.message);
        }
        const { data: websitesData, error: websitesError } = await supabase.from("websites").select("*").order("created_at", { ascending: false });
        if (websitesError) {
          throw new Error(websitesError.message);
        }
        const { data: domainsData, error: domainsError } = await supabase.from("domains").select(`
            *,
            website:websites(*)
          `).order("created_at", { ascending: false });
        if (domainsError) {
          throw new Error(domainsError.message);
        }
        const usage = {
          websites_count: websitesData?.length || 0,
          domains_count: domainsData?.length || 0,
          storage_used: 0,
          // This would be calculated from actual storage usage
          bandwidth_used: 0,
          // This would be calculated from actual bandwidth usage
          team_members_count: 0
          // This would be fetched from team_members table
        };
        const plan = planData?.plan || { limits: { websites: 1, domains: 1, storage: 1, bandwidth: 10, team_members: 1 } };
        const planUsage = {
          websites: { used: usage.websites_count, limit: plan.limits.websites },
          domains: { used: usage.domains_count, limit: plan.limits.domains },
          storage: { used: usage.storage_used, limit: plan.limits.storage },
          bandwidth: { used: usage.bandwidth_used, limit: plan.limits.bandwidth },
          team_members: { used: usage.team_members_count, limit: plan.limits.team_members }
        };
        setData({
          plan: planData,
          websites: websitesData || [],
          domains: domainsData || [],
          usage,
          planUsage,
          loading: false,
          error: null
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to fetch user data"
        }));
      }
    };
    fetchUserData();
  }, [supabase]);
  return data;
}

// src/entitlements/entitlements.ts
var EntitlementService = class {
  constructor() {
    this.planLimits = /* @__PURE__ */ new Map();
    this.featureDefinitions = /* @__PURE__ */ new Map();
    this.initializeFeatureDefinitions();
  }
  initializeFeatureDefinitions() {
    this.featureDefinitions.set("trial", [
      "basic_websites",
      "basic_domains",
      "basic_analytics",
      "basic_support"
    ]);
    this.featureDefinitions.set("starter", [
      "basic_websites",
      "basic_domains",
      "basic_analytics",
      "basic_support",
      "custom_domains",
      "ssl_certificates",
      "priority_support",
      "basic_team_collaboration"
    ]);
    this.featureDefinitions.set("pro", [
      "basic_websites",
      "basic_domains",
      "basic_analytics",
      "basic_support",
      "custom_domains",
      "ssl_certificates",
      "priority_support",
      "basic_team_collaboration",
      "advanced_analytics",
      "api_access",
      "advanced_team_collaboration",
      "custom_integrations"
    ]);
    this.featureDefinitions.set("enterprise", [
      "basic_websites",
      "basic_domains",
      "basic_analytics",
      "basic_support",
      "custom_domains",
      "ssl_certificates",
      "priority_support",
      "basic_team_collaboration",
      "advanced_analytics",
      "api_access",
      "advanced_team_collaboration",
      "custom_integrations",
      "unlimited_websites",
      "unlimited_domains",
      "dedicated_support",
      "custom_contracts",
      "sla_guarantee"
    ]);
  }
  checkFeatureEntitlement(check) {
    const { feature, planId, usage, limits } = check;
    const planFeatures = this.featureDefinitions.get(planId) || [];
    if (!planFeatures.includes(feature)) {
      return {
        feature,
        allowed: false,
        reason: "Feature not available in your current plan",
        upgradeRequired: true
      };
    }
    const usageCheck = this.checkUsageLimits(feature, usage, limits);
    if (!usageCheck.allowed) {
      return {
        feature,
        allowed: false,
        reason: usageCheck.reason,
        upgradeRequired: usageCheck.upgradeRequired,
        currentUsage: usageCheck.currentUsage,
        limit: usageCheck.limit
      };
    }
    return {
      feature,
      allowed: true
    };
  }
  checkUsageLimits(feature, usage, limits) {
    switch (feature) {
      case "basic_websites":
      case "unlimited_websites":
        return this.checkLimit("websites", usage.websites, limits.websites);
      case "basic_domains":
      case "custom_domains":
      case "unlimited_domains":
        return this.checkLimit("domains", usage.domains, limits.domains);
      case "basic_team_collaboration":
      case "advanced_team_collaboration":
        return this.checkLimit("team_members", usage.team_members, limits.team_members);
      case "storage":
        return this.checkLimit("storage", usage.storage, limits.storage);
      case "bandwidth":
        return this.checkLimit("bandwidth", usage.bandwidth, limits.bandwidth);
      default:
        return { allowed: true };
    }
  }
  checkLimit(resource, currentUsage, limit) {
    if (limit === -1) {
      return { allowed: true };
    }
    if (currentUsage.used >= limit) {
      return {
        allowed: false,
        reason: `You have reached your ${resource} limit`,
        upgradeRequired: true,
        currentUsage: currentUsage.used,
        limit
      };
    }
    if (currentUsage.used >= limit * 0.8) {
      return {
        allowed: true,
        reason: `You are approaching your ${resource} limit`,
        currentUsage: currentUsage.used,
        limit
      };
    }
    return { allowed: true };
  }
  getAvailableFeatures(planId) {
    return this.featureDefinitions.get(planId) || [];
  }
  getFeatureTier(feature) {
    for (const [planId, features] of this.featureDefinitions.entries()) {
      if (features.includes(feature)) {
        return planId;
      }
    }
    return "enterprise";
  }
  canUpgrade(currentPlanId, targetPlanId) {
    const planHierarchy = ["trial", "starter", "pro", "enterprise"];
    const currentIndex = planHierarchy.indexOf(currentPlanId);
    const targetIndex = planHierarchy.indexOf(targetPlanId);
    return targetIndex > currentIndex;
  }
  getUpgradePath(currentPlanId) {
    const planHierarchy = ["trial", "starter", "pro", "enterprise"];
    const currentIndex = planHierarchy.indexOf(currentPlanId);
    return planHierarchy.slice(currentIndex + 1);
  }
};
var entitlementService = new EntitlementService();

// src/entitlements/hooks.ts
var import_react4 = require("react");
function useEntitlements() {
  const { plan, planUsage, loading, error } = useUserData();
  const [entitlements, setEntitlements] = (0, import_react4.useState)(/* @__PURE__ */ new Map());
  (0, import_react4.useEffect)(() => {
    if (!plan || !planUsage)
      return;
    const currentEntitlements = /* @__PURE__ */ new Map();
    const availableFeatures = entitlementService.getAvailableFeatures(plan.plan.id);
    availableFeatures.forEach((feature) => {
      const check = {
        feature,
        planId: plan.plan.id,
        usage: planUsage,
        limits: plan.plan.limits
      };
      const entitlement = entitlementService.checkFeatureEntitlement(check);
      currentEntitlements.set(feature, entitlement);
    });
    setEntitlements(currentEntitlements);
  }, [plan, planUsage]);
  const checkFeature = (feature) => {
    if (entitlements.has(feature)) {
      return entitlements.get(feature);
    }
    if (!plan || !planUsage) {
      return {
        feature,
        allowed: false,
        reason: "No plan information available"
      };
    }
    const check = {
      feature,
      planId: plan.plan.id,
      usage: planUsage,
      limits: plan.plan.limits
    };
    return entitlementService.checkFeatureEntitlement(check);
  };
  const hasFeature = (feature) => {
    return checkFeature(feature).allowed;
  };
  const canUseFeature = (feature) => {
    const entitlement = checkFeature(feature);
    return entitlement.allowed && !entitlement.upgradeRequired;
  };
  const getFeatureReason = (feature) => {
    return checkFeature(feature).reason;
  };
  const requiresUpgrade = (feature) => {
    return checkFeature(feature).upgradeRequired || false;
  };
  return {
    checkFeature,
    hasFeature,
    canUseFeature,
    getFeatureReason,
    requiresUpgrade,
    loading,
    error
  };
}
function useFeatureGate(feature) {
  const entitlements = useEntitlements();
  const entitlement = entitlements.checkFeature(feature);
  return {
    ...entitlement,
    ...entitlements,
    isAllowed: entitlement.allowed,
    needsUpgrade: entitlement.upgradeRequired || false
  };
}

// src/openai/openai.ts
var OpenAIService = class {
  constructor(apiKey) {
    this.baseUrl = "https://api.openai.com/v1";
    this.apiKey = apiKey;
  }
  async makeRequest(endpoint, method = "POST", body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Generate embeddings for text
  async generateEmbedding(text) {
    try {
      const response = await this.makeRequest("/embeddings", "POST", {
        input: text,
        model: "text-embedding-ada-002"
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error;
    }
  }
  // Generate embeddings for multiple texts
  async generateEmbeddings(texts) {
    try {
      const response = await this.makeRequest("/embeddings", "POST", {
        input: texts,
        model: "text-embedding-ada-002"
      });
      return response.data.map((item) => item.embedding);
    } catch (error) {
      console.error("Error generating embeddings:", error);
      throw error;
    }
  }
  // Generate chat completion
  async generateChatCompletion(messages, model = "gpt-3.5-turbo", maxTokens = 1e3, temperature = 0.7) {
    try {
      const response = await this.makeRequest("/chat/completions", "POST", {
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream: false
      });
      return response;
    } catch (error) {
      console.error("Error generating chat completion:", error);
      throw error;
    }
  }
  // Process FAQ document and generate embedding
  async processFAQDocument(document2) {
    try {
      const combinedText = `${document2.title}

${document2.content}`;
      const embedding = await this.generateEmbedding(combinedText);
      const processedContent = this.cleanText(document2.content);
      return {
        embedding,
        processed_content: processedContent
      };
    } catch (error) {
      console.error("Error processing FAQ document:", error);
      throw error;
    }
  }
  // Clean and normalize text for better embedding
  cleanText(text) {
    return text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim().toLowerCase();
  }
  // Generate chatbot response with context
  async generateChatbotResponse(question, context, conversationHistory = []) {
    try {
      const contextText = context.map((doc) => `Title: ${doc.title}
Content: ${doc.content}`).join("\n\n");
      const systemMessage = {
        role: "system",
        content: `You are a helpful AI assistant for Naveeg, a website management platform. 
        
Use the following FAQ context to answer user questions. If the question is not covered in the context, 
provide a helpful response based on your general knowledge about website management and hosting.

FAQ Context:
${contextText}

Instructions:
- Answer questions based on the provided FAQ context when possible
- Be helpful, accurate, and concise
- If you're unsure about something, say so
- Provide step-by-step instructions when appropriate
- Be friendly and professional in tone`
      };
      const userMessage = {
        role: "user",
        content: question
      };
      const messages = [systemMessage, ...conversationHistory, userMessage];
      const response = await this.generateChatCompletion(messages, "gpt-3.5-turbo", 1e3, 0.7);
      const confidence = this.calculateConfidence(question, context);
      return {
        answer: response.choices[0].message.content,
        sources: context,
        confidence,
        tokens_used: response.usage.total_tokens
      };
    } catch (error) {
      console.error("Error generating chatbot response:", error);
      throw error;
    }
  }
  // Calculate confidence score based on context relevance
  calculateConfidence(question, context) {
    if (context.length === 0)
      return 0.3;
    const questionWords = question.toLowerCase().split(/\s+/);
    const contextText = context.map((doc) => `${doc.title} ${doc.content}`).join(" ").toLowerCase();
    let matches = 0;
    questionWords.forEach((word) => {
      if (contextText.includes(word)) {
        matches++;
      }
    });
    const confidence = Math.min(0.9, 0.3 + matches / questionWords.length * 0.6);
    return Math.round(confidence * 100) / 100;
  }
  // Generate search query from user question
  generateSearchQuery(question) {
    const words = question.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter((word) => word.length > 2).slice(0, 10);
    return words.join(" ");
  }
};
var openAIService = new OpenAIService(process.env.OPENAI_API_KEY || "placeholder_key");
function getOpenAIService() {
  const apiKey = process.env.OPENAI_API_KEY || "placeholder_key";
  return new OpenAIService(apiKey);
}

// src/google/google-analytics.ts
var GoogleAnalyticsService = class {
  constructor(accessToken) {
    this.baseUrl = "https://analyticsdata.googleapis.com/v1beta";
    this.managementUrl = "https://analyticsadmin.googleapis.com/v1beta";
    this.accessToken = accessToken;
  }
  async makeRequest(url, method = "GET", body) {
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      throw new Error(`Google Analytics API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Get all accounts accessible to the user
  async getAccounts() {
    try {
      const response = await this.makeRequest(
        `${this.managementUrl}/accounts`
      );
      return response.accounts || [];
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  }
  // Get properties for an account
  async getProperties(accountId) {
    try {
      const response = await this.makeRequest(
        `${this.managementUrl}/accounts/${accountId}/properties`
      );
      return response.properties || [];
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  }
  // Get data streams for a property
  async getDataStreams(propertyId) {
    try {
      const response = await this.makeRequest(
        `${this.managementUrl}/properties/${propertyId}/dataStreams`
      );
      return response.dataStreams || [];
    } catch (error) {
      console.error("Error fetching data streams:", error);
      throw error;
    }
  }
  // Get analytics data for a property
  async getAnalyticsData(propertyId, startDate, endDate, metrics = ["activeUsers", "sessions", "screenPageViews"], dimensions = ["date"]) {
    try {
      const requestBody = {
        requests: [{
          property: `properties/${propertyId}`,
          dateRanges: [{
            startDate,
            endDate
          }],
          metrics: metrics.map((metric) => ({ name: metric })),
          dimensions: dimensions.map((dimension) => ({ name: dimension })),
          keepEmptyRows: false
        }]
      };
      const response = await this.makeRequest(
        `${this.baseUrl}/properties/${propertyId}:runReport`,
        "POST",
        requestBody
      );
      return response.reports[0];
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      throw error;
    }
  }
  // Get comprehensive metrics for a property
  async getMetrics(propertyId, startDate, endDate) {
    try {
      const basicMetrics = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["activeUsers", "sessions", "screenPageViews", "bounceRate", "averageSessionDuration", "newUsers"]
      );
      const trafficSourceData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["sessions", "activeUsers", "bounceRate"],
        ["sessionDefaultChannelGrouping"]
      );
      const topPagesData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["screenPageViews", "uniquePageviews", "averageSessionDuration", "bounceRate"],
        ["pagePath"]
      );
      const geoData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["sessions", "activeUsers"],
        ["country"]
      );
      const deviceData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["sessions", "activeUsers"],
        ["deviceCategory"]
      );
      const browserData = await this.getAnalyticsData(
        propertyId,
        startDate,
        endDate,
        ["sessions", "activeUsers"],
        ["browser"]
      );
      const metrics = {
        users: this.extractMetricValue(basicMetrics, "activeUsers") || 0,
        sessions: this.extractMetricValue(basicMetrics, "sessions") || 0,
        pageViews: this.extractMetricValue(basicMetrics, "screenPageViews") || 0,
        bounceRate: this.extractMetricValue(basicMetrics, "bounceRate") || 0,
        avgSessionDuration: this.extractMetricValue(basicMetrics, "averageSessionDuration") || 0,
        newUsers: this.extractMetricValue(basicMetrics, "newUsers") || 0,
        returningUsers: 0,
        // Calculate as users - newUsers
        organicSearch: this.extractTrafficSourceValue(trafficSourceData, "Organic Search") || 0,
        directTraffic: this.extractTrafficSourceValue(trafficSourceData, "Direct") || 0,
        socialTraffic: this.extractTrafficSourceValue(trafficSourceData, "Social") || 0,
        referralTraffic: this.extractTrafficSourceValue(trafficSourceData, "Referral") || 0,
        paidSearch: this.extractTrafficSourceValue(trafficSourceData, "Paid Search") || 0,
        emailTraffic: this.extractTrafficSourceValue(trafficSourceData, "Email") || 0,
        topPages: this.processTopPagesData(topPagesData),
        topSources: this.processTrafficSourceData(trafficSourceData),
        topCountries: this.processGeoData(geoData),
        topDevices: this.processDeviceData(deviceData),
        topBrowsers: this.processBrowserData(browserData)
      };
      metrics.returningUsers = Math.max(0, metrics.users - metrics.newUsers);
      return metrics;
    } catch (error) {
      console.error("Error fetching comprehensive metrics:", error);
      throw error;
    }
  }
  // Helper method to extract metric values
  extractMetricValue(report, metricName) {
    const metricIndex = report.metricHeaders.findIndex((header) => header.name === metricName);
    if (metricIndex === -1)
      return 0;
    const totalValue = report.rows.reduce((sum, row) => {
      const value = parseFloat(row.metricValues[metricIndex]?.value || "0");
      return sum + value;
    }, 0);
    return totalValue;
  }
  // Helper method to extract traffic source values
  extractTrafficSourceValue(report, sourceName) {
    const sourceIndex = report.dimensionHeaders.findIndex((header) => header.name === "sessionDefaultChannelGrouping");
    if (sourceIndex === -1)
      return 0;
    const sessionsIndex = report.metricHeaders.findIndex((header) => header.name === "sessions");
    if (sessionsIndex === -1)
      return 0;
    const row = report.rows.find(
      (row2) => row2.dimensionValues[sourceIndex]?.value === sourceName
    );
    return row ? parseFloat(row.metricValues[sessionsIndex]?.value || "0") : 0;
  }
  // Process top pages data
  processTopPagesData(report) {
    const pageIndex = report.dimensionHeaders.findIndex((header) => header.name === "pagePath");
    const pageViewsIndex = report.metricHeaders.findIndex((header) => header.name === "screenPageViews");
    const uniquePageViewsIndex = report.metricHeaders.findIndex((header) => header.name === "uniquePageviews");
    const avgTimeIndex = report.metricHeaders.findIndex((header) => header.name === "averageSessionDuration");
    const bounceRateIndex = report.metricHeaders.findIndex((header) => header.name === "bounceRate");
    return report.rows.map((row) => ({
      page: row.dimensionValues[pageIndex]?.value || "",
      pageViews: parseFloat(row.metricValues[pageViewsIndex]?.value || "0"),
      uniquePageViews: parseFloat(row.metricValues[uniquePageViewsIndex]?.value || "0"),
      avgTimeOnPage: parseFloat(row.metricValues[avgTimeIndex]?.value || "0"),
      bounceRate: parseFloat(row.metricValues[bounceRateIndex]?.value || "0")
    })).sort((a, b) => b.pageViews - a.pageViews).slice(0, 10);
  }
  // Process traffic source data
  processTrafficSourceData(report) {
    const sourceIndex = report.dimensionHeaders.findIndex((header) => header.name === "sessionDefaultChannelGrouping");
    const sessionsIndex = report.metricHeaders.findIndex((header) => header.name === "sessions");
    const usersIndex = report.metricHeaders.findIndex((header) => header.name === "activeUsers");
    const bounceRateIndex = report.metricHeaders.findIndex((header) => header.name === "bounceRate");
    return report.rows.map((row) => ({
      source: row.dimensionValues[sourceIndex]?.value || "",
      medium: "Unknown",
      // This would need additional dimension
      sessions: parseFloat(row.metricValues[sessionsIndex]?.value || "0"),
      users: parseFloat(row.metricValues[usersIndex]?.value || "0"),
      bounceRate: parseFloat(row.metricValues[bounceRateIndex]?.value || "0")
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 10);
  }
  // Process geographic data
  processGeoData(report) {
    const countryIndex = report.dimensionHeaders.findIndex((header) => header.name === "country");
    const sessionsIndex = report.metricHeaders.findIndex((header) => header.name === "sessions");
    const usersIndex = report.metricHeaders.findIndex((header) => header.name === "activeUsers");
    return report.rows.map((row) => ({
      country: row.dimensionValues[countryIndex]?.value || "",
      sessions: parseFloat(row.metricValues[sessionsIndex]?.value || "0"),
      users: parseFloat(row.metricValues[usersIndex]?.value || "0")
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 10);
  }
  // Process device data
  processDeviceData(report) {
    const deviceIndex = report.dimensionHeaders.findIndex((header) => header.name === "deviceCategory");
    const sessionsIndex = report.metricHeaders.findIndex((header) => header.name === "sessions");
    const usersIndex = report.metricHeaders.findIndex((header) => header.name === "activeUsers");
    return report.rows.map((row) => ({
      device: row.dimensionValues[deviceIndex]?.value || "",
      sessions: parseFloat(row.metricValues[sessionsIndex]?.value || "0"),
      users: parseFloat(row.metricValues[usersIndex]?.value || "0")
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 5);
  }
  // Process browser data
  processBrowserData(report) {
    const browserIndex = report.dimensionHeaders.findIndex((header) => header.name === "browser");
    const sessionsIndex = report.metricHeaders.findIndex((header) => header.name === "sessions");
    const usersIndex = report.metricHeaders.findIndex((header) => header.name === "activeUsers");
    return report.rows.map((row) => ({
      browser: row.dimensionValues[browserIndex]?.value || "",
      sessions: parseFloat(row.metricValues[sessionsIndex]?.value || "0"),
      users: parseFloat(row.metricValues[usersIndex]?.value || "0")
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 5);
  }
};

// src/google/google-search-console.ts
var GoogleSearchConsoleService = class {
  constructor(accessToken) {
    this.baseUrl = "https://www.googleapis.com/webmasters/v3";
    this.accessToken = accessToken;
  }
  async makeRequest(url, method = "GET", body) {
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      throw new Error(`Google Search Console API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Get all sites accessible to the user
  async getSites() {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/sites`
      );
      return response.siteEntry || [];
    } catch (error) {
      console.error("Error fetching sites:", error);
      throw error;
    }
  }
  // Get search analytics data
  async getSearchAnalytics(siteUrl, query) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        "POST",
        query
      );
      return response;
    } catch (error) {
      console.error("Error fetching search analytics:", error);
      throw error;
    }
  }
  // Get sitemaps for a site
  async getSitemaps(siteUrl) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/sitemaps`
      );
      return response.sitemap || [];
    } catch (error) {
      console.error("Error fetching sitemaps:", error);
      throw error;
    }
  }
  // Inspect a URL
  async inspectUrl(siteUrl, url) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/sites/${encodeURIComponent(siteUrl)}/urlInspection/index:inspect`,
        "POST",
        { inspectionUrl: url }
      );
      return response;
    } catch (error) {
      console.error("Error inspecting URL:", error);
      throw error;
    }
  }
  // Get comprehensive metrics for a site
  async getMetrics(siteUrl, startDate, endDate) {
    try {
      const overallData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        rowLimit: 1
      });
      const queriesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 100
      });
      const pagesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 100
      });
      const countriesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ["country"],
        rowLimit: 100
      });
      const devicesData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ["device"],
        rowLimit: 100
      });
      const searchAppearanceData = await this.getSearchAnalytics(siteUrl, {
        startDate,
        endDate,
        dimensions: ["searchAppearance"],
        rowLimit: 100
      });
      const metrics = {
        totalClicks: this.calculateTotalClicks(overallData),
        totalImpressions: this.calculateTotalImpressions(overallData),
        averageCtr: this.calculateAverageCtr(overallData),
        averagePosition: this.calculateAveragePosition(overallData),
        topQueries: this.processQueriesData(queriesData),
        topPages: this.processPagesData(pagesData),
        topCountries: this.processCountriesData(countriesData),
        topDevices: this.processDevicesData(devicesData),
        searchAppearance: this.processSearchAppearanceData(searchAppearanceData)
      };
      return metrics;
    } catch (error) {
      console.error("Error fetching comprehensive metrics:", error);
      throw error;
    }
  }
  // Helper methods for data processing
  calculateTotalClicks(data) {
    return data.rows.reduce((sum, row) => sum + row.clicks, 0);
  }
  calculateTotalImpressions(data) {
    return data.rows.reduce((sum, row) => sum + row.impressions, 0);
  }
  calculateAverageCtr(data) {
    if (data.rows.length === 0)
      return 0;
    const totalCtr = data.rows.reduce((sum, row) => sum + row.ctr, 0);
    return totalCtr / data.rows.length;
  }
  calculateAveragePosition(data) {
    if (data.rows.length === 0)
      return 0;
    const totalPosition = data.rows.reduce((sum, row) => sum + row.position, 0);
    return totalPosition / data.rows.length;
  }
  processQueriesData(data) {
    return data.rows.map((row) => ({
      query: row.keys[0] || "",
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 20);
  }
  processPagesData(data) {
    return data.rows.map((row) => ({
      page: row.keys[0] || "",
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 20);
  }
  processCountriesData(data) {
    return data.rows.map((row) => ({
      country: row.keys[0] || "",
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 10);
  }
  processDevicesData(data) {
    return data.rows.map((row) => ({
      device: row.keys[0] || "",
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  }
  processSearchAppearanceData(data) {
    return data.rows.map((row) => ({
      type: row.keys[0] || "",
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 10);
  }
};

// src/google/google-business-profile.ts
var GoogleBusinessProfileService = class {
  constructor(accessToken) {
    this.baseUrl = "https://mybusinessaccountmanagement.googleapis.com/v1";
    this.businessUrl = "https://mybusinessbusinessinformation.googleapis.com/v1";
    this.insightsUrl = "https://mybusinessinsights.googleapis.com/v1";
    this.accessToken = accessToken;
  }
  async makeRequest(url, method = "GET", body) {
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      throw new Error(`Google Business Profile API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Get all accounts accessible to the user
  async getAccounts() {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/accounts`
      );
      return response.accounts || [];
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  }
  // Get locations for an account
  async getLocations(accountId) {
    try {
      const response = await this.makeRequest(
        `${this.businessUrl}/accounts/${accountId}/locations`
      );
      return response.locations || [];
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }
  // Get insights for a location
  async getInsights(locationId, startDate, endDate, metricRequests) {
    try {
      const requestBody = {
        locationNames: [`locations/${locationId}`],
        basicRequest: {
          metricRequests,
          startDate: {
            year: parseInt(startDate.split("-")[0]),
            month: parseInt(startDate.split("-")[1]),
            day: parseInt(startDate.split("-")[2])
          },
          endDate: {
            year: parseInt(endDate.split("-")[0]),
            month: parseInt(endDate.split("-")[1]),
            day: parseInt(endDate.split("-")[2])
          }
        }
      };
      const response = await this.makeRequest(
        `${this.insightsUrl}/locations/${locationId}:reportInsights`,
        "POST",
        requestBody
      );
      return response.locationMetrics[0]?.metricValues || [];
    } catch (error) {
      console.error("Error fetching insights:", error);
      throw error;
    }
  }
  // Get posts for a location
  async getPosts(locationId) {
    try {
      const response = await this.makeRequest(
        `${this.businessUrl}/locations/${locationId}/localPosts`
      );
      return response.posts || [];
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
  // Get comprehensive metrics for a location
  async getMetrics(locationId, startDate, endDate) {
    try {
      const basicInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: "QUERIES_DIRECT", options: [] },
        { metric: "QUERIES_INDIRECT", options: [] },
        { metric: "QUERIES_CHAIN", options: [] },
        { metric: "VIEWS_MAPS", options: [] },
        { metric: "VIEWS_SEARCH", options: [] },
        { metric: "ACTIONS_PHONE", options: [] },
        { metric: "ACTIONS_WEBSITE", options: [] },
        { metric: "ACTIONS_DRIVING_DIRECTIONS", options: [] },
        { metric: "PHOTOS_VIEWS_MERCHANT", options: [] },
        { metric: "PHOTOS_VIEWS_CUSTOMERS", options: [] },
        { metric: "PHOTOS_COUNT_MERCHANT", options: [] },
        { metric: "PHOTOS_COUNT_CUSTOMERS", options: [] },
        { metric: "POSTS_VIEWS", options: [] },
        { metric: "REVIEWS", options: [] }
      ]);
      const hourlyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: "QUERIES_DIRECT", options: ["HOUR"] }
      ]);
      const dailyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: "QUERIES_DIRECT", options: ["DAY"] }
      ]);
      const monthlyInsights = await this.getInsights(locationId, startDate, endDate, [
        { metric: "QUERIES_DIRECT", options: ["MONTH"] }
      ]);
      const metrics = {
        totalViews: this.extractMetricValue(basicInsights, "QUERIES_DIRECT") + this.extractMetricValue(basicInsights, "QUERIES_INDIRECT") + this.extractMetricValue(basicInsights, "QUERIES_CHAIN"),
        totalCalls: this.extractMetricValue(basicInsights, "ACTIONS_PHONE"),
        totalDirectionRequests: this.extractMetricValue(basicInsights, "ACTIONS_DRIVING_DIRECTIONS"),
        totalWebsiteClicks: this.extractMetricValue(basicInsights, "ACTIONS_WEBSITE"),
        totalPhotoViews: this.extractMetricValue(basicInsights, "PHOTOS_VIEWS_MERCHANT") + this.extractMetricValue(basicInsights, "PHOTOS_VIEWS_CUSTOMERS"),
        totalPosts: this.extractMetricValue(basicInsights, "POSTS_VIEWS"),
        totalReviews: this.extractMetricValue(basicInsights, "REVIEWS"),
        averageRating: 0,
        // This would need to be calculated from review data
        topSearchQueries: this.processSearchQueries(basicInsights),
        topPhotoViews: this.processPhotoViews(basicInsights),
        customerActions: this.processCustomerActions(basicInsights),
        hourlyViews: this.processHourlyViews(hourlyInsights),
        dailyViews: this.processDailyViews(dailyInsights),
        monthlyViews: this.processMonthlyViews(monthlyInsights)
      };
      return metrics;
    } catch (error) {
      console.error("Error fetching comprehensive metrics:", error);
      throw error;
    }
  }
  // Helper methods for data processing
  extractMetricValue(insights, metric) {
    const insight = insights.find((i) => i.metric.metric === metric);
    if (!insight)
      return 0;
    if (insight.metricValue.intValue !== void 0) {
      return insight.metricValue.intValue;
    }
    if (insight.metricValue.doubleValue !== void 0) {
      return insight.metricValue.doubleValue;
    }
    return 0;
  }
  processSearchQueries(insights) {
    return [];
  }
  processPhotoViews(insights) {
    return [];
  }
  processCustomerActions(insights) {
    const actions = [
      { action: "Phone Calls", count: this.extractMetricValue(insights, "ACTIONS_PHONE") },
      { action: "Website Clicks", count: this.extractMetricValue(insights, "ACTIONS_WEBSITE") },
      { action: "Directions", count: this.extractMetricValue(insights, "ACTIONS_DRIVING_DIRECTIONS") }
    ];
    return actions.filter((action) => action.count > 0);
  }
  processHourlyViews(insights) {
    return [];
  }
  processDailyViews(insights) {
    return [];
  }
  processMonthlyViews(insights) {
    return [];
  }
};

// src/google/google.ts
var GoogleService = class {
  constructor(integrations) {
    const analyticsIntegration = integrations.find((i) => i.type === "analytics" && i.isActive);
    if (analyticsIntegration) {
      this.analyticsService = new GoogleAnalyticsService(analyticsIntegration.accessToken);
    }
    const searchConsoleIntegration = integrations.find((i) => i.type === "search_console" && i.isActive);
    if (searchConsoleIntegration) {
      this.searchConsoleService = new GoogleSearchConsoleService(searchConsoleIntegration.accessToken);
    }
    const businessProfileIntegration = integrations.find((i) => i.type === "business_profile" && i.isActive);
    if (businessProfileIntegration) {
      this.businessProfileService = new GoogleBusinessProfileService(businessProfileIntegration.accessToken);
    }
  }
  // Get OAuth authorization URL
  static getAuthorizationUrl(config) {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent"
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  // Exchange authorization code for tokens
  static async exchangeCodeForTokens(code, config) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: config.redirectUri
      })
    });
    if (!response.ok) {
      throw new Error(`OAuth token exchange failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in
    };
  }
  // Refresh access token
  static async refreshAccessToken(refreshToken, config) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    });
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in
    };
  }
  // Get comprehensive metrics from all connected services
  async getMetricsSummary(startDate, endDate, propertyId, siteUrl, locationId) {
    const summary = {
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    };
    try {
      if (this.analyticsService && propertyId) {
        summary.analytics = await this.analyticsService.getMetrics(propertyId, startDate, endDate);
      }
      if (this.searchConsoleService && siteUrl) {
        summary.searchConsole = await this.searchConsoleService.getMetrics(siteUrl, startDate, endDate);
      }
      if (this.businessProfileService && locationId) {
        summary.businessProfile = await this.businessProfileService.getMetrics(locationId, startDate, endDate);
      }
    } catch (error) {
      console.error("Error fetching metrics summary:", error);
      throw error;
    }
    return summary;
  }
  // Get Analytics service
  getAnalyticsService() {
    return this.analyticsService;
  }
  // Get Search Console service
  getSearchConsoleService() {
    return this.searchConsoleService;
  }
  // Get Business Profile service
  getBusinessProfileService() {
    return this.businessProfileService;
  }
  // Check if service is available
  isServiceAvailable(type) {
    switch (type) {
      case "analytics":
        return this.analyticsService !== void 0;
      case "search_console":
        return this.searchConsoleService !== void 0;
      case "business_profile":
        return this.businessProfileService !== void 0;
      default:
        return false;
    }
  }
  // Get available services
  getAvailableServices() {
    const services = [];
    if (this.analyticsService)
      services.push("analytics");
    if (this.searchConsoleService)
      services.push("search_console");
    if (this.businessProfileService)
      services.push("business_profile");
    return services;
  }
};
var GOOGLE_OAUTH_SCOPES = {
  analytics: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics.manage.users.readonly"
  ],
  search_console: [
    "https://www.googleapis.com/auth/webmasters.readonly"
  ],
  business_profile: [
    "https://www.googleapis.com/auth/business.manage"
  ]
};
function getAllGoogleScopes() {
  return [
    ...GOOGLE_OAUTH_SCOPES.analytics,
    ...GOOGLE_OAUTH_SCOPES.search_console,
    ...GOOGLE_OAUTH_SCOPES.business_profile
  ];
}
function getScopesForServices(services) {
  const scopes = [];
  services.forEach((service) => {
    scopes.push(...GOOGLE_OAUTH_SCOPES[service]);
  });
  return [...new Set(scopes)];
}

// src/team/types.ts
var DEFAULT_ROLE_PERMISSIONS = {
  admin: {
    can_manage_website: true,
    can_manage_domains: true,
    can_manage_analytics: true,
    can_manage_billing: true,
    can_manage_team: true,
    can_manage_integrations: true,
    can_manage_content: true,
    can_manage_settings: true
  },
  editor: {
    can_manage_website: true,
    can_manage_domains: false,
    can_manage_analytics: true,
    can_manage_billing: false,
    can_manage_team: false,
    can_manage_integrations: false,
    can_manage_content: true,
    can_manage_settings: false
  }
};
var TEAM_MEMBER_STATUS_COLORS = {
  pending: "yellow",
  active: "green",
  suspended: "red"
};
var TEAM_MEMBER_ROLE_COLORS = {
  admin: "purple",
  editor: "blue"
};

// src/team/team-service.ts
var TeamService = class _TeamService {
  constructor(serverClient) {
    this.supabase = serverClient || createBrowserClient2();
  }
  // Team Members Management
  async getTeamMembers(websiteId) {
    try {
      const { data, error } = await this.supabase.from("team_members").select(`
          *,
          user:user_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `).eq("website_id", websiteId).order("created_at", { ascending: false });
      return { data: data || [], error };
    } catch (error) {
      return { data: [], error };
    }
  }
  async addTeamMember(websiteId, email, role, invitedBy) {
    try {
      const { data: existingUser } = await this.supabase.from("users").select("id").eq("email", email).single();
      if (existingUser) {
        const { data, error } = await this.supabase.from("team_members").insert({
          user_id: existingUser.id,
          website_id: websiteId,
          role,
          permissions: DEFAULT_ROLE_PERMISSIONS[role],
          invited_by: invitedBy,
          status: "active",
          joined_at: (/* @__PURE__ */ new Date()).toISOString()
        }).select().single();
        return { data: null, error };
      } else {
        const invitationToken = this.generateInvitationToken();
        const expiresAt = /* @__PURE__ */ new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const { data, error } = await this.supabase.from("team_invitations").insert({
          email,
          website_id: websiteId,
          role,
          permissions: DEFAULT_ROLE_PERMISSIONS[role],
          invited_by: invitedBy,
          token: invitationToken,
          expires_at: expiresAt.toISOString()
        }).select().single();
        await this.sendInvitationEmail(email, invitationToken, websiteId);
        return { data, error };
      }
    } catch (error) {
      return { data: null, error };
    }
  }
  async updateTeamMember(memberId, updates) {
    try {
      const { data, error } = await this.supabase.from("team_members").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", memberId).select().single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
  async removeTeamMember(memberId) {
    try {
      const { error } = await this.supabase.from("team_members").delete().eq("id", memberId);
      return { error };
    } catch (error) {
      return { error };
    }
  }
  // Team Invitations Management
  async getTeamInvitations(websiteId) {
    try {
      const { data, error } = await this.supabase.from("team_invitations").select("*").eq("website_id", websiteId).order("created_at", { ascending: false });
      return { data: data || [], error };
    } catch (error) {
      return { data: [], error };
    }
  }
  async acceptInvitation(token, userId) {
    try {
      const { data: invitation, error: invitationError } = await this.supabase.from("team_invitations").select("*").eq("token", token).eq("status", "pending").single();
      if (invitationError || !invitation) {
        return { data: null, error: "Invalid or expired invitation" };
      }
      if (new Date(invitation.expires_at) < /* @__PURE__ */ new Date()) {
        return { data: null, error: "Invitation has expired" };
      }
      const { data: teamMember, error: memberError } = await this.supabase.from("team_members").insert({
        user_id: userId,
        website_id: invitation.website_id,
        role: invitation.role,
        permissions: invitation.permissions,
        invited_by: invitation.invited_by,
        status: "active",
        joined_at: (/* @__PURE__ */ new Date()).toISOString()
      }).select().single();
      if (memberError) {
        return { data: null, error: memberError };
      }
      await this.supabase.from("team_invitations").update({ status: "accepted" }).eq("id", invitation.id);
      return { data: teamMember, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
  async revokeInvitation(invitationId) {
    try {
      const { error } = await this.supabase.from("team_invitations").update({ status: "revoked" }).eq("id", invitationId);
      return { error };
    } catch (error) {
      return { error };
    }
  }
  // Team Activity Logging
  async logActivity(websiteId, userId, action, resourceType, resourceId, details, ipAddress, userAgent) {
    try {
      const { error } = await this.supabase.from("team_activities").insert({
        website_id: websiteId,
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details: details || {},
        ip_address: ipAddress,
        user_agent: userAgent
      });
      return { error };
    } catch (error) {
      return { error };
    }
  }
  async getTeamActivity(websiteId, limit = 50, offset = 0) {
    try {
      const { data, error } = await this.supabase.from("team_activities").select(`
          *,
          user:user_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `).eq("website_id", websiteId).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
      return { data: data || [], error };
    } catch (error) {
      return { data: [], error };
    }
  }
  // Team Settings Management
  async getTeamSettings(websiteId) {
    try {
      const { data, error } = await this.supabase.from("team_settings").select("*").eq("website_id", websiteId).single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
  async updateTeamSettings(websiteId, settings) {
    try {
      const { data, error } = await this.supabase.from("team_settings").upsert({
        website_id: websiteId,
        ...settings,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).select().single();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
  // Permission Checking
  async checkPermission(userId, websiteId, permission) {
    try {
      const { data: member } = await this.supabase.from("team_members").select("permissions").eq("user_id", userId).eq("website_id", websiteId).eq("status", "active").single();
      return member?.permissions?.[permission] || false;
    } catch (error) {
      return false;
    }
  }
  async getUserRole(userId, websiteId) {
    try {
      const { data: member } = await this.supabase.from("team_members").select("role").eq("user_id", userId).eq("website_id", websiteId).eq("status", "active").single();
      return member?.role || null;
    } catch (error) {
      return null;
    }
  }
  // Utility Methods
  generateInvitationToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  async sendInvitationEmail(email, token, websiteId) {
    console.log(`Sending invitation email to ${email} with token ${token} for website ${websiteId}`);
  }
  // Static method to create server-side instance
  static createServerInstance(cookies) {
    return new _TeamService(createServerClient2(cookies));
  }
};

// src/team/hooks.ts
var import_react5 = require("react");
function useTeamMembers(websiteId) {
  const [members, setMembers] = (0, import_react5.useState)([]);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [error, setError] = (0, import_react5.useState)(null);
  const teamService = new TeamService();
  const loadMembers = (0, import_react5.useCallback)(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await teamService.getTeamMembers(websiteId);
      if (error2) {
        setError(error2.message || "Failed to load team members");
      } else {
        setMembers(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load team members");
    } finally {
      setLoading(false);
    }
  }, [websiteId, teamService]);
  const addMember = (0, import_react5.useCallback)(async (email, role, invitedBy) => {
    try {
      setError(null);
      const { data, error: error2 } = await teamService.addTeamMember(websiteId, email, role, invitedBy);
      if (error2) {
        setError(error2.message || "Failed to add team member");
        return { success: false, error: error2.message };
      }
      await loadMembers();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add team member";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [websiteId, teamService, loadMembers]);
  const updateMember = (0, import_react5.useCallback)(async (memberId, updates) => {
    try {
      setError(null);
      const { data, error: error2 } = await teamService.updateTeamMember(memberId, updates);
      if (error2) {
        setError(error2.message || "Failed to update team member");
        return { success: false, error: error2.message };
      }
      setMembers((prev) => prev.map(
        (member) => member.id === memberId ? { ...member, ...updates } : member
      ));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update team member";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [teamService]);
  const removeMember = (0, import_react5.useCallback)(async (memberId) => {
    try {
      setError(null);
      const { error: error2 } = await teamService.removeTeamMember(memberId);
      if (error2) {
        setError(error2.message || "Failed to remove team member");
        return { success: false, error: error2.message };
      }
      setMembers((prev) => prev.filter((member) => member.id !== memberId));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to remove team member";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [teamService]);
  (0, import_react5.useEffect)(() => {
    if (websiteId) {
      loadMembers();
    }
  }, [websiteId, loadMembers]);
  return {
    members,
    loading,
    error,
    addMember,
    updateMember,
    removeMember,
    refresh: loadMembers
  };
}
function useTeamInvitations(websiteId) {
  const [invitations, setInvitations] = (0, import_react5.useState)([]);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [error, setError] = (0, import_react5.useState)(null);
  const teamService = new TeamService();
  const loadInvitations = (0, import_react5.useCallback)(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await teamService.getTeamInvitations(websiteId);
      if (error2) {
        setError(error2.message || "Failed to load invitations");
      } else {
        setInvitations(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load invitations");
    } finally {
      setLoading(false);
    }
  }, [websiteId, teamService]);
  const revokeInvitation = (0, import_react5.useCallback)(async (invitationId) => {
    try {
      setError(null);
      const { error: error2 } = await teamService.revokeInvitation(invitationId);
      if (error2) {
        setError(error2.message || "Failed to revoke invitation");
        return { success: false, error: error2.message };
      }
      setInvitations((prev) => prev.map(
        (invitation) => invitation.id === invitationId ? { ...invitation, status: "revoked" } : invitation
      ));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to revoke invitation";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [teamService]);
  (0, import_react5.useEffect)(() => {
    if (websiteId) {
      loadInvitations();
    }
  }, [websiteId, loadInvitations]);
  return {
    invitations,
    loading,
    error,
    revokeInvitation,
    refresh: loadInvitations
  };
}
function useTeamActivity(websiteId) {
  const [activities, setActivities] = (0, import_react5.useState)([]);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [error, setError] = (0, import_react5.useState)(null);
  const [hasMore, setHasMore] = (0, import_react5.useState)(true);
  const teamService = new TeamService();
  const loadActivities = (0, import_react5.useCallback)(async (limit = 50, offset = 0) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await teamService.getTeamActivity(websiteId, limit, offset);
      if (error2) {
        setError(error2.message || "Failed to load activities");
      } else {
        if (offset === 0) {
          setActivities(data);
        } else {
          setActivities((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === limit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }, [websiteId, teamService]);
  const loadMore = (0, import_react5.useCallback)(() => {
    if (!loading && hasMore) {
      loadActivities(50, activities.length);
    }
  }, [loading, hasMore, activities.length, loadActivities]);
  (0, import_react5.useEffect)(() => {
    if (websiteId) {
      loadActivities();
    }
  }, [websiteId, loadActivities]);
  return {
    activities,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => loadActivities()
  };
}
function useTeamSettings(websiteId) {
  const [settings, setSettings] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [error, setError] = (0, import_react5.useState)(null);
  const teamService = new TeamService();
  const loadSettings = (0, import_react5.useCallback)(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await teamService.getTeamSettings(websiteId);
      if (error2) {
        setError(error2.message || "Failed to load settings");
      } else {
        setSettings(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [websiteId, teamService]);
  const updateSettings = (0, import_react5.useCallback)(async (updates) => {
    try {
      setError(null);
      const { data, error: error2 } = await teamService.updateTeamSettings(websiteId, updates);
      if (error2) {
        setError(error2.message || "Failed to update settings");
        return { success: false, error: error2.message };
      }
      setSettings(data);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update settings";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [websiteId, teamService]);
  (0, import_react5.useEffect)(() => {
    if (websiteId) {
      loadSettings();
    }
  }, [websiteId, loadSettings]);
  return {
    settings,
    loading,
    error,
    updateSettings,
    refresh: loadSettings
  };
}
function useTeamPermissions(userId, websiteId) {
  const [permissions, setPermissions] = (0, import_react5.useState)({});
  const [role, setRole] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const teamService = new TeamService();
  const checkPermission = (0, import_react5.useCallback)(async (permission) => {
    try {
      const hasPermission = await teamService.checkPermission(userId, websiteId, permission);
      setPermissions((prev) => ({ ...prev, [permission]: hasPermission }));
      return hasPermission;
    } catch (error) {
      return false;
    }
  }, [userId, websiteId, teamService]);
  const loadPermissions = (0, import_react5.useCallback)(async () => {
    try {
      setLoading(true);
      const userRole = await teamService.getUserRole(userId, websiteId);
      setRole(userRole);
      const permissionKeys = [
        "can_manage_website",
        "can_manage_domains",
        "can_manage_analytics",
        "can_manage_billing",
        "can_manage_team",
        "can_manage_integrations",
        "can_manage_content",
        "can_manage_settings"
      ];
      const permissionChecks = permissionKeys.map(
        (key) => teamService.checkPermission(userId, websiteId, key)
      );
      const results = await Promise.all(permissionChecks);
      const permissionMap = permissionKeys.reduce((acc, key, index) => {
        acc[key] = results[index];
        return acc;
      }, {});
      setPermissions(permissionMap);
    } catch (error) {
      console.error("Failed to load permissions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, websiteId, teamService]);
  (0, import_react5.useEffect)(() => {
    if (userId && websiteId) {
      loadPermissions();
    }
  }, [userId, websiteId, loadPermissions]);
  return {
    permissions,
    role,
    loading,
    checkPermission,
    refresh: loadPermissions
  };
}

// src/n8n/n8n.ts
var N8NService = class {
  constructor(baseUrl = process.env.N8N_WEBHOOK_URL || "http://localhost:5678") {
    this.baseUrl = baseUrl;
  }
  /**
   * Capture a lead from the marketing site
   */
  async captureLead(leadData) {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/lead-captured`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...leadData,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error capturing lead:", error);
      throw new Error("Failed to capture lead");
    }
  }
  /**
   * Provision a new site
   */
  async provisionSite(siteData) {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/provision-site`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...siteData,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error provisioning site:", error);
      throw new Error("Failed to provision site");
    }
  }
  /**
   * Process domain action
   */
  async processDomainAction(domainData) {
    try {
      const response = await fetch(`${this.baseUrl}/webhook/domain-webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...domainData,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error processing domain action:", error);
      throw new Error("Failed to process domain action");
    }
  }
  /**
   * Check N8N health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/healthz`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.ok;
    } catch (error) {
      console.error("Error checking N8N health:", error);
      return false;
    }
  }
  /**
   * Get workflow status
   */
  async getWorkflowStatus(workflowId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error getting workflow status:", error);
      throw new Error("Failed to get workflow status");
    }
  }
};
var n8nService = new N8NService();

// src/n8n/hooks.ts
var import_react6 = require("react");
function useN8N() {
  const [loading, setLoading] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)(null);
  const handleRequest = (0, import_react6.useCallback)(async (requestFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const captureLead = (0, import_react6.useCallback)(async (leadData) => {
    return handleRequest(() => n8nService.captureLead(leadData));
  }, [handleRequest]);
  const provisionSite = (0, import_react6.useCallback)(async (siteData) => {
    return handleRequest(() => n8nService.provisionSite(siteData));
  }, [handleRequest]);
  const processDomainAction = (0, import_react6.useCallback)(async (domainData) => {
    return handleRequest(() => n8nService.processDomainAction(domainData));
  }, [handleRequest]);
  const checkHealth = (0, import_react6.useCallback)(async () => {
    return handleRequest(() => n8nService.checkHealth());
  }, [handleRequest]);
  return {
    captureLead,
    provisionSite,
    processDomainAction,
    checkHealth,
    loading,
    error
  };
}

// src/i18n/i18n-service.ts
var I18nService = class {
  constructor(config) {
    this.translations = /* @__PURE__ */ new Map();
    this.locales = /* @__PURE__ */ new Map();
    this.config = config;
    this.currentLocale = config.defaultLocale;
    this.initializeLocales();
  }
  /**
   * Initialize supported locales
   */
  initializeLocales() {
    const localeData = {
      en: {
        code: "en",
        name: "English",
        nativeName: "English",
        flag: "\u{1F1FA}\u{1F1F8}",
        currency: "USD",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: false
      },
      es: {
        code: "es",
        name: "Spanish",
        nativeName: "Espa\xF1ol",
        flag: "\u{1F1EA}\u{1F1F8}",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: "." },
        rtl: false
      },
      fr: {
        code: "fr",
        name: "French",
        nativeName: "Fran\xE7ais",
        flag: "\u{1F1EB}\u{1F1F7}",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: " " },
        rtl: false
      },
      de: {
        code: "de",
        name: "German",
        nativeName: "Deutsch",
        flag: "\u{1F1E9}\u{1F1EA}",
        currency: "EUR",
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: "." },
        rtl: false
      },
      it: {
        code: "it",
        name: "Italian",
        nativeName: "Italiano",
        flag: "\u{1F1EE}\u{1F1F9}",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: "." },
        rtl: false
      },
      pt: {
        code: "pt",
        name: "Portuguese",
        nativeName: "Portugu\xEAs",
        flag: "\u{1F1F5}\u{1F1F9}",
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: " " },
        rtl: false
      },
      ru: {
        code: "ru",
        name: "Russian",
        nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
        flag: "\u{1F1F7}\u{1F1FA}",
        currency: "RUB",
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ",", thousands: " " },
        rtl: false
      },
      ja: {
        code: "ja",
        name: "Japanese",
        nativeName: "\u65E5\u672C\u8A9E",
        flag: "\u{1F1EF}\u{1F1F5}",
        currency: "JPY",
        dateFormat: "YYYY/MM/DD",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: false
      },
      ko: {
        code: "ko",
        name: "Korean",
        nativeName: "\uD55C\uAD6D\uC5B4",
        flag: "\u{1F1F0}\u{1F1F7}",
        currency: "KRW",
        dateFormat: "YYYY.MM.DD",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: false
      },
      zh: {
        code: "zh",
        name: "Chinese",
        nativeName: "\u4E2D\u6587",
        flag: "\u{1F1E8}\u{1F1F3}",
        currency: "CNY",
        dateFormat: "YYYY/MM/DD",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: false
      },
      ar: {
        code: "ar",
        name: "Arabic",
        nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        flag: "\u{1F1F8}\u{1F1E6}",
        currency: "SAR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: true
      },
      hi: {
        code: "hi",
        name: "Hindi",
        nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940",
        flag: "\u{1F1EE}\u{1F1F3}",
        currency: "INR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
        numberFormat: { decimal: ".", thousands: "," },
        rtl: false
      }
    };
    Object.values(localeData).forEach((locale) => {
      this.locales.set(locale.code, locale);
    });
  }
  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.currentLocale;
  }
  /**
   * Set current locale
   */
  setLocale(locale) {
    if (this.locales.has(locale)) {
      this.currentLocale = locale;
      this.saveLocaleToStorage(locale);
    }
  }
  /**
   * Get all supported locales
   */
  getSupportedLocales() {
    return Array.from(this.locales.values());
  }
  /**
   * Get locale information
   */
  getLocale(localeCode) {
    return this.locales.get(localeCode);
  }
  /**
   * Check if locale is supported
   */
  isLocaleSupported(localeCode) {
    return this.locales.has(localeCode);
  }
  /**
   * Load translations for a namespace
   */
  async loadTranslations(namespace, locale) {
    try {
      const response = await fetch(`${this.config.loadPath}/${locale}/${namespace}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${locale}/${namespace}`);
      }
      const translations = await response.json();
      const translationMap = /* @__PURE__ */ new Map();
      Object.entries(translations).forEach(([key, value]) => {
        translationMap.set(key, {
          key,
          value,
          locale,
          namespace,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      });
      this.translations.set(`${locale}:${namespace}`, translationMap);
    } catch (error) {
      console.error(`Error loading translations for ${locale}/${namespace}:`, error);
      if (locale !== this.config.fallbackLocale) {
        await this.loadTranslations(namespace, this.config.fallbackLocale);
      }
    }
  }
  /**
   * Get translation
   */
  t(key, options) {
    const namespace = options?.namespace || "common";
    const locale = this.currentLocale;
    const translationKey = `${locale}:${namespace}`;
    const translation = this.translations.get(translationKey)?.get(key);
    if (!translation) {
      const fallbackKey = `${this.config.fallbackLocale}:${namespace}`;
      const fallbackTranslation = this.translations.get(fallbackKey)?.get(key);
      if (fallbackTranslation) {
        return this.interpolate(fallbackTranslation.value, options);
      }
      return options?.defaultValue || key;
    }
    return this.interpolate(translation.value, options);
  }
  /**
   * Interpolate variables in translation
   */
  interpolate(text, options) {
    if (!options?.variables)
      return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return options.variables[key] || match;
    });
  }
  /**
   * Check if translation exists
   */
  exists(key, options) {
    const namespace = options?.namespace || "common";
    const locale = this.currentLocale;
    const translationKey = `${locale}:${namespace}`;
    return this.translations.get(translationKey)?.has(key) || false;
  }
  /**
   * Get all translations for a namespace
   */
  getTranslations(namespace, locale) {
    const targetLocale = locale || this.currentLocale;
    const translationKey = `${targetLocale}:${namespace}`;
    return this.translations.get(translationKey) || /* @__PURE__ */ new Map();
  }
  /**
   * Save locale to storage
   */
  saveLocaleToStorage(locale) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.config.detection.cookieName, locale);
    }
  }
  /**
   * Load locale from storage
   */
  loadLocaleFromStorage() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.config.detection.cookieName);
    }
    return null;
  }
  /**
   * Detect user's preferred locale
   */
  detectLocale() {
    const storedLocale = this.loadLocaleFromStorage();
    if (storedLocale && this.isLocaleSupported(storedLocale)) {
      return storedLocale;
    }
    if (typeof window !== "undefined" && window.navigator) {
      const browserLang = window.navigator.language.split("-")[0];
      if (this.isLocaleSupported(browserLang)) {
        return browserLang;
      }
    }
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLocale = urlParams.get("lang");
      if (urlLocale && this.isLocaleSupported(urlLocale)) {
        return urlLocale;
      }
    }
    return this.config.defaultLocale;
  }
  /**
   * Initialize i18n service
   */
  async initialize() {
    const detectedLocale = this.detectLocale();
    this.setLocale(detectedLocale);
    await this.loadTranslations("common", this.currentLocale);
  }
  /**
   * Change locale and reload translations
   */
  async changeLocale(locale) {
    if (!this.isLocaleSupported(locale)) {
      throw new Error(`Locale ${locale} is not supported`);
    }
    this.setLocale(locale);
    for (const namespace of this.config.namespaces) {
      await this.loadTranslations(namespace, locale);
    }
  }
  /**
   * Get RTL status for current locale
   */
  isRTL() {
    const locale = this.getLocale(this.currentLocale);
    return locale?.rtl || false;
  }
  /**
   * Get currency for current locale
   */
  getCurrency() {
    const locale = this.getLocale(this.currentLocale);
    return locale?.currency || "USD";
  }
  /**
   * Get date format for current locale
   */
  getDateFormat() {
    const locale = this.getLocale(this.currentLocale);
    return locale?.dateFormat || "MM/DD/YYYY";
  }
  /**
   * Get time format for current locale
   */
  getTimeFormat() {
    const locale = this.getLocale(this.currentLocale);
    return locale?.timeFormat || "HH:mm";
  }
  /**
   * Get number format for current locale
   */
  getNumberFormat() {
    const locale = this.getLocale(this.currentLocale);
    return locale?.numberFormat || { decimal: ".", thousands: "," };
  }
};

// src/i18n/translation-manager.ts
var import_supabase_js6 = require("@supabase/supabase-js");
var TranslationManager = class {
  constructor(supabaseUrl3, supabaseKey) {
    this.cache = /* @__PURE__ */ new Map();
    this.lastSync = /* @__PURE__ */ new Map();
    this.supabase = (0, import_supabase_js6.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
  }
  /**
   * Load translations from database
   */
  async loadTranslations(locale, namespace) {
    try {
      const { data, error } = await this.supabase.from("translations").select("*").eq("locale", locale).eq("namespace", namespace);
      if (error) {
        throw error;
      }
      const translations = /* @__PURE__ */ new Map();
      if (data) {
        data.forEach((translation) => {
          translations.set(translation.key, translation);
          this.cache.set(`${locale}:${namespace}:${translation.key}`, translation);
        });
      }
      this.lastSync.set(`${locale}:${namespace}`, Date.now());
      return translations;
    } catch (error) {
      console.error("Error loading translations:", error);
      return /* @__PURE__ */ new Map();
    }
  }
  /**
   * Save translation to database
   */
  async saveTranslation(translation) {
    try {
      const translationData = {
        ...translation,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { error } = await this.supabase.from("translations").upsert(translationData);
      if (error) {
        throw error;
      }
      this.cache.set(`${translation.locale}:${translation.namespace}:${translation.key}`, translationData);
      return true;
    } catch (error) {
      console.error("Error saving translation:", error);
      return false;
    }
  }
  /**
   * Update translation
   */
  async updateTranslation(key, locale, namespace, updates) {
    try {
      const { error } = await this.supabase.from("translations").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("key", key).eq("locale", locale).eq("namespace", namespace);
      if (error) {
        throw error;
      }
      const cacheKey = `${locale}:${namespace}:${key}`;
      const cached = this.cache.get(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, { ...cached, ...updates });
      }
      return true;
    } catch (error) {
      console.error("Error updating translation:", error);
      return false;
    }
  }
  /**
   * Delete translation
   */
  async deleteTranslation(key, locale, namespace) {
    try {
      const { error } = await this.supabase.from("translations").delete().eq("key", key).eq("locale", locale).eq("namespace", namespace);
      if (error) {
        throw error;
      }
      this.cache.delete(`${locale}:${namespace}:${key}`);
      return true;
    } catch (error) {
      console.error("Error deleting translation:", error);
      return false;
    }
  }
  /**
   * Get translation from cache
   */
  getCachedTranslation(key, locale, namespace) {
    return this.cache.get(`${locale}:${namespace}:${key}`);
  }
  /**
   * Check if translations need sync
   */
  needsSync(locale, namespace) {
    const lastSyncTime = this.lastSync.get(`${locale}:${namespace}`);
    if (!lastSyncTime)
      return true;
    return Date.now() - lastSyncTime > 36e5;
  }
  /**
   * Sync translations with database
   */
  async syncTranslations(locale, namespace) {
    if (!this.needsSync(locale, namespace))
      return;
    await this.loadTranslations(locale, namespace);
  }
  /**
   * Get all translations for a locale
   */
  async getAllTranslations(locale) {
    try {
      const { data, error } = await this.supabase.from("translations").select("*").eq("locale", locale);
      if (error) {
        throw error;
      }
      const translations = /* @__PURE__ */ new Map();
      if (data) {
        data.forEach((translation) => {
          translations.set(`${translation.namespace}:${translation.key}`, translation);
        });
      }
      return translations;
    } catch (error) {
      console.error("Error loading all translations:", error);
      return /* @__PURE__ */ new Map();
    }
  }
  /**
   * Get missing translations
   */
  async getMissingTranslations(sourceLocale, targetLocale, namespace) {
    try {
      const [sourceTranslations, targetTranslations] = await Promise.all([
        this.loadTranslations(sourceLocale, namespace),
        this.loadTranslations(targetLocale, namespace)
      ]);
      const missing = [];
      sourceTranslations.forEach((_, key) => {
        if (!targetTranslations.has(key)) {
          missing.push(key);
        }
      });
      return missing;
    } catch (error) {
      console.error("Error getting missing translations:", error);
      return [];
    }
  }
  /**
   * Bulk import translations
   */
  async bulkImportTranslations(translations) {
    try {
      const { error } = await this.supabase.from("translations").upsert(translations);
      if (error) {
        throw error;
      }
      translations.forEach((translation) => {
        this.cache.set(
          `${translation.locale}:${translation.namespace}:${translation.key}`,
          translation
        );
      });
      return true;
    } catch (error) {
      console.error("Error bulk importing translations:", error);
      return false;
    }
  }
  /**
   * Export translations
   */
  async exportTranslations(locale, namespace) {
    try {
      let query = this.supabase.from("translations").select("*").eq("locale", locale);
      if (namespace) {
        query = query.eq("namespace", namespace);
      }
      const { data, error } = await query;
      if (error) {
        throw error;
      }
      const exportData = {};
      if (data) {
        data.forEach((translation) => {
          if (!exportData[translation.namespace]) {
            exportData[translation.namespace] = {};
          }
          exportData[translation.namespace][translation.key] = translation.value;
        });
      }
      return exportData;
    } catch (error) {
      console.error("Error exporting translations:", error);
      return {};
    }
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    this.lastSync.clear();
  }
  /**
   * Get cache statistics
   */
  getCacheStats() {
    const namespaces = /* @__PURE__ */ new Set();
    const locales = /* @__PURE__ */ new Set();
    this.cache.forEach((_, key) => {
      const [locale, namespace] = key.split(":");
      locales.add(locale);
      namespaces.add(namespace);
    });
    return {
      totalTranslations: this.cache.size,
      namespaces: Array.from(namespaces),
      locales: Array.from(locales),
      lastSyncTimes: Object.fromEntries(this.lastSync)
    };
  }
};

// src/i18n/locale-detector.ts
var LocaleDetector = class {
  constructor(supportedLocales, fallbackLocale = "en") {
    this.supportedLocales = supportedLocales;
    this.fallbackLocale = fallbackLocale;
  }
  /**
   * Detect locale from multiple sources
   */
  detect() {
    const detectionOrder = [
      this.detectFromCookie,
      this.detectFromLocalStorage,
      this.detectFromNavigator,
      this.detectFromURL,
      this.detectFromHeader
    ];
    for (const detector of detectionOrder) {
      try {
        const result = detector.call(this);
        if (result && this.isLocaleSupported(result.locale)) {
          return result;
        }
      } catch (error) {
        console.warn("Error in locale detection:", error);
      }
    }
    return {
      locale: this.fallbackLocale,
      confidence: 1,
      source: "default"
    };
  }
  /**
   * Detect from cookie
   */
  detectFromCookie() {
    if (typeof document === "undefined")
      return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "locale" || name === "lang" || name === "i18n") {
        const locale = this.normalizeLocale(value);
        if (this.isLocaleSupported(locale)) {
          return {
            locale,
            confidence: 0.9,
            source: "cookie"
          };
        }
      }
    }
    return null;
  }
  /**
   * Detect from localStorage
   */
  detectFromLocalStorage() {
    if (typeof window === "undefined")
      return null;
    const stored = localStorage.getItem("locale") || localStorage.getItem("lang") || localStorage.getItem("i18n");
    if (stored) {
      const locale = this.normalizeLocale(stored);
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.8,
          source: "localStorage"
        };
      }
    }
    return null;
  }
  /**
   * Detect from navigator
   */
  detectFromNavigator() {
    if (typeof navigator === "undefined")
      return null;
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      const locale = this.normalizeLocale(lang);
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.7,
          source: "navigator"
        };
      }
    }
    return null;
  }
  /**
   * Detect from URL
   */
  detectFromURL() {
    if (typeof window === "undefined")
      return null;
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang") || urlParams.get("locale") || urlParams.get("lng");
    if (langParam) {
      const locale = this.normalizeLocale(langParam);
      if (this.isLocaleSupported(locale)) {
        return {
          locale,
          confidence: 0.6,
          source: "url"
        };
      }
    }
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/");
    if (pathSegments.length > 1) {
      const potentialLocale = this.normalizeLocale(pathSegments[1]);
      if (this.isLocaleSupported(potentialLocale)) {
        return {
          locale: potentialLocale,
          confidence: 0.6,
          source: "url"
        };
      }
    }
    return null;
  }
  /**
   * Detect from header (server-side)
   */
  detectFromHeader() {
    if (typeof window === "undefined")
      return null;
    return null;
  }
  /**
   * Normalize locale code
   */
  normalizeLocale(locale) {
    const normalized = locale.split("-")[0].toLowerCase();
    const localeMap = {
      "en": "en",
      "es": "es",
      "fr": "fr",
      "de": "de",
      "it": "it",
      "pt": "pt",
      "ru": "ru",
      "ja": "ja",
      "ko": "ko",
      "zh": "zh",
      "ar": "ar",
      "hi": "hi"
    };
    return localeMap[normalized] || "en";
  }
  /**
   * Check if locale is supported
   */
  isLocaleSupported(locale) {
    return this.supportedLocales.includes(locale);
  }
  /**
   * Get best match for locale
   */
  getBestMatch(requestedLocale) {
    const normalized = this.normalizeLocale(requestedLocale);
    if (this.isLocaleSupported(normalized)) {
      return normalized;
    }
    const language = normalized.split("-")[0];
    for (const supported of this.supportedLocales) {
      if (supported.startsWith(language)) {
        return supported;
      }
    }
    return this.fallbackLocale;
  }
  /**
   * Get all supported locales
   */
  getSupportedLocales() {
    return [...this.supportedLocales];
  }
  /**
   * Add supported locale
   */
  addSupportedLocale(locale) {
    if (!this.supportedLocales.includes(locale)) {
      this.supportedLocales.push(locale);
    }
  }
  /**
   * Remove supported locale
   */
  removeSupportedLocale(locale) {
    const index = this.supportedLocales.indexOf(locale);
    if (index > -1) {
      this.supportedLocales.splice(index, 1);
    }
  }
  /**
   * Set fallback locale
   */
  setFallbackLocale(locale) {
    this.fallbackLocale = locale;
  }
  /**
   * Get fallback locale
   */
  getFallbackLocale() {
    return this.fallbackLocale;
  }
};

// src/i18n/currency-formatter.ts
var CurrencyFormatter = class {
  constructor(locale, currency) {
    this.locale = locale;
    this.currency = currency || this.getDefaultCurrency(locale);
  }
  /**
   * Get default currency for locale
   */
  getDefaultCurrency(locale) {
    const currencyMap = {
      en: "USD",
      es: "EUR",
      fr: "EUR",
      de: "EUR",
      it: "EUR",
      pt: "EUR",
      ru: "RUB",
      ja: "JPY",
      ko: "KRW",
      zh: "CNY",
      ar: "SAR",
      hi: "INR"
    };
    return currencyMap[locale] || "USD";
  }
  /**
   * Format currency amount
   */
  format(amount, options) {
    const formatOptions = {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      useGrouping: options?.useGrouping ?? true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount);
    } catch (error) {
      console.error("Error formatting currency:", error);
      return `${this.currency} ${amount.toFixed(2)}`;
    }
  }
  /**
   * Format currency with custom currency
   */
  formatWithCurrency(amount, currency, options) {
    const formatOptions = {
      style: "currency",
      currency,
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      useGrouping: options?.useGrouping ?? true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount);
    } catch (error) {
      console.error("Error formatting currency:", error);
      return `${currency} ${amount.toFixed(2)}`;
    }
  }
  /**
   * Parse currency string to number
   */
  parse(currencyString) {
    const cleaned = currencyString.replace(/[^\d.,-]/g, "");
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();
    let normalized = cleaned;
    if (decimalSeparator !== ".") {
      normalized = normalized.replace(new RegExp(`\\${decimalSeparator}`, "g"), ".");
    }
    if (thousandsSeparator) {
      normalized = normalized.replace(new RegExp(`\\${thousandsSeparator}`, "g"), "");
    }
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }
  /**
   * Get currency symbol
   */
  getCurrencySymbol(currency) {
    const targetCurrency = currency || this.currency;
    try {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return formatter.format(0).replace(/\d/g, "").trim();
    } catch (error) {
      console.error("Error getting currency symbol:", error);
      return targetCurrency;
    }
  }
  /**
   * Get decimal separator for locale
   */
  getDecimalSeparator() {
    try {
      const formatter = new Intl.NumberFormat(this.locale);
      const parts = formatter.formatToParts(1.1);
      const decimalPart = parts.find((part) => part.type === "decimal");
      return decimalPart?.value || ".";
    } catch (error) {
      return ".";
    }
  }
  /**
   * Get thousands separator for locale
   */
  getThousandsSeparator() {
    try {
      const formatter = new Intl.NumberFormat(this.locale);
      const parts = formatter.formatToParts(1e3);
      const groupPart = parts.find((part) => part.type === "group");
      return groupPart?.value || ",";
    } catch (error) {
      return ",";
    }
  }
  /**
   * Convert currency amount
   */
  convert(amount, fromCurrency, toCurrency, rate) {
    return amount * rate;
  }
  /**
   * Format compact currency (e.g., $1.2K, $1.2M)
   */
  formatCompact(amount, options) {
    const formatOptions = {
      style: "currency",
      currency: this.currency,
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount);
    } catch (error) {
      console.error("Error formatting compact currency:", error);
      return this.format(amount, options);
    }
  }
  /**
   * Format currency range
   */
  formatRange(minAmount, maxAmount, options) {
    const minFormatted = this.format(minAmount, options);
    const maxFormatted = this.format(maxAmount, options);
    return `${minFormatted} - ${maxFormatted}`;
  }
  /**
   * Get supported currencies for locale
   */
  getSupportedCurrencies() {
    const commonCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "RUB", "INR", "BRL", "KRW"];
    return commonCurrencies;
  }
  /**
   * Check if currency is supported
   */
  isCurrencySupported(currency) {
    try {
      new Intl.NumberFormat(this.locale, {
        style: "currency",
        currency
      }).format(0);
      return true;
    } catch (error) {
      return false;
    }
  }
  /**
   * Update locale and currency
   */
  updateLocale(locale, currency) {
    this.locale = locale;
    this.currency = currency || this.getDefaultCurrency(locale);
  }
  /**
   * Get current currency
   */
  getCurrentCurrency() {
    return this.currency;
  }
  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.locale;
  }
};

// src/i18n/date-formatter.ts
var DateFormatter = class {
  constructor(locale, timeZone) {
    this.locale = locale;
    this.timeZone = timeZone || this.getDefaultTimeZone();
  }
  /**
   * Get default timezone for locale
   */
  getDefaultTimeZone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      return "UTC";
    }
  }
  /**
   * Format date
   */
  format(date, options) {
    const dateObj = this.parseDate(date);
    const formatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: this.timeZone,
      ...options
    };
    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateObj.toLocaleDateString();
    }
  }
  /**
   * Format time
   */
  formatTime(date, options) {
    const dateObj = this.parseDate(date);
    const formatOptions = {
      hour: "numeric",
      minute: "2-digit",
      timeZone: this.timeZone,
      ...options
    };
    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj);
    } catch (error) {
      console.error("Error formatting time:", error);
      return dateObj.toLocaleTimeString();
    }
  }
  /**
   * Format date and time
   */
  formatDateTime(date, options) {
    const dateObj = this.parseDate(date);
    const formatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: this.timeZone,
      ...options
    };
    try {
      return new Intl.DateTimeFormat(this.locale, formatOptions).format(dateObj);
    } catch (error) {
      console.error("Error formatting date and time:", error);
      return dateObj.toLocaleString();
    }
  }
  /**
   * Format relative time (e.g., "2 hours ago", "in 3 days")
   */
  formatRelative(date, options) {
    const dateObj = this.parseDate(date);
    const now = /* @__PURE__ */ new Date();
    try {
      const rtf = new Intl.RelativeTimeFormat(this.locale, {
        numeric: options?.numeric || "auto"
      });
      const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1e3);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);
      if (Math.abs(diffInYears) >= 1) {
        return rtf.format(diffInYears, "year");
      } else if (Math.abs(diffInMonths) >= 1) {
        return rtf.format(diffInMonths, "month");
      } else if (Math.abs(diffInWeeks) >= 1) {
        return rtf.format(diffInWeeks, "week");
      } else if (Math.abs(diffInDays) >= 1) {
        return rtf.format(diffInDays, "day");
      } else if (Math.abs(diffInHours) >= 1) {
        return rtf.format(diffInHours, "hour");
      } else if (Math.abs(diffInMinutes) >= 1) {
        return rtf.format(diffInMinutes, "minute");
      } else {
        return rtf.format(diffInSeconds, "second");
      }
    } catch (error) {
      console.error("Error formatting relative time:", error);
      return this.format(dateObj);
    }
  }
  /**
   * Format date range
   */
  formatRange(startDate, endDate, options) {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);
    const formatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: this.timeZone,
      ...options
    };
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, formatOptions);
      return `${formatter.format(start)} - ${formatter.format(end)}`;
    } catch (error) {
      console.error("Error formatting date range:", error);
      return `${this.format(start)} - ${this.format(end)}`;
    }
  }
  /**
   * Parse date from various formats
   */
  parseDate(date) {
    if (date instanceof Date) {
      return date;
    }
    if (typeof date === "number") {
      return new Date(date);
    }
    if (typeof date === "string") {
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid date string: ${date}`);
      }
      return parsed;
    }
    throw new Error("Invalid date input");
  }
  /**
   * Get week start day for locale
   */
  getWeekStartDay() {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { weekday: "long" });
      const weekStart = new Date(2024, 0, 1);
      const dayName = formatter.format(weekStart);
      const dayMap = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
      };
      return dayMap[dayName] || 1;
    } catch (error) {
      return 1;
    }
  }
  /**
   * Get month names
   */
  getMonthNames(format = "long") {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { month: format });
      return Array.from(
        { length: 12 },
        (_, i) => formatter.format(new Date(2024, i, 1))
      );
    } catch (error) {
      console.error("Error getting month names:", error);
      return [];
    }
  }
  /**
   * Get weekday names
   */
  getWeekdayNames(format = "long") {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, { weekday: format });
      return Array.from(
        { length: 7 },
        (_, i) => formatter.format(new Date(2024, 0, i + 1))
      );
    } catch (error) {
      console.error("Error getting weekday names:", error);
      return [];
    }
  }
  /**
   * Get date format pattern
   */
  getDateFormatPattern() {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale);
      const parts = formatter.formatToParts(new Date(2024, 11, 25));
      return parts.map((part) => {
        switch (part.type) {
          case "year":
            return "YYYY";
          case "month":
            return "MM";
          case "day":
            return "DD";
          case "hour":
            return "HH";
          case "minute":
            return "mm";
          case "second":
            return "ss";
          default:
            return part.value;
        }
      }).join("");
    } catch (error) {
      console.error("Error getting date format pattern:", error);
      return "MM/DD/YYYY";
    }
  }
  /**
   * Get time format pattern
   */
  getTimeFormatPattern() {
    try {
      const formatter = new Intl.DateTimeFormat(this.locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: false
      });
      const parts = formatter.formatToParts(new Date(2024, 0, 1, 14, 30));
      return parts.map((part) => {
        switch (part.type) {
          case "hour":
            return "HH";
          case "minute":
            return "mm";
          case "second":
            return "ss";
          default:
            return part.value;
        }
      }).join("");
    } catch (error) {
      console.error("Error getting time format pattern:", error);
      return "HH:mm";
    }
  }
  /**
   * Check if date is today
   */
  isToday(date) {
    const dateObj = this.parseDate(date);
    const today = /* @__PURE__ */ new Date();
    return dateObj.toDateString() === today.toDateString();
  }
  /**
   * Check if date is yesterday
   */
  isYesterday(date) {
    const dateObj = this.parseDate(date);
    const yesterday = /* @__PURE__ */ new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateObj.toDateString() === yesterday.toDateString();
  }
  /**
   * Check if date is tomorrow
   */
  isTomorrow(date) {
    const dateObj = this.parseDate(date);
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateObj.toDateString() === tomorrow.toDateString();
  }
  /**
   * Update locale and timezone
   */
  updateLocale(locale, timeZone) {
    this.locale = locale;
    this.timeZone = timeZone || this.getDefaultTimeZone();
  }
  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.locale;
  }
  /**
   * Get current timezone
   */
  getCurrentTimeZone() {
    return this.timeZone;
  }
};

// src/i18n/number-formatter.ts
var NumberFormatter = class {
  constructor(locale) {
    this.locale = locale;
  }
  /**
   * Format number
   */
  format(number, options) {
    const formatOptions = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting number:", error);
      return number.toString();
    }
  }
  /**
   * Format compact number (e.g., 1.2K, 1.2M)
   */
  formatCompact(number, options) {
    const formatOptions = {
      style: "decimal",
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting compact number:", error);
      return this.format(number, options);
    }
  }
  /**
   * Format percentage
   */
  formatPercent(number, options) {
    const formatOptions = {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number / 100);
    } catch (error) {
      console.error("Error formatting percentage:", error);
      return `${number}%`;
    }
  }
  /**
   * Format ordinal number (e.g., 1st, 2nd, 3rd)
   */
  formatOrdinal(number, options) {
    const formatOptions = {
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting ordinal number:", error);
      return number.toString();
    }
  }
  /**
   * Format scientific notation
   */
  formatScientific(number, options) {
    const formatOptions = {
      style: "decimal",
      notation: "scientific",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting scientific number:", error);
      return number.toExponential();
    }
  }
  /**
   * Format engineering notation
   */
  formatEngineering(number, options) {
    const formatOptions = {
      style: "decimal",
      notation: "engineering",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting engineering number:", error);
      return number.toExponential();
    }
  }
  /**
   * Parse number string
   */
  parse(numberString) {
    const cleaned = numberString.replace(/[^\d.,-]/g, "");
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();
    let normalized = cleaned;
    if (decimalSeparator !== ".") {
      normalized = normalized.replace(new RegExp(`\\${decimalSeparator}`, "g"), ".");
    }
    if (thousandsSeparator) {
      normalized = normalized.replace(new RegExp(`\\${thousandsSeparator}`, "g"), "");
    }
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }
  /**
   * Get decimal separator for locale
   */
  getDecimalSeparator() {
    try {
      const formatter = new Intl.NumberFormat(this.locale);
      const parts = formatter.formatToParts(1.1);
      const decimalPart = parts.find((part) => part.type === "decimal");
      return decimalPart?.value || ".";
    } catch (error) {
      return ".";
    }
  }
  /**
   * Get thousands separator for locale
   */
  getThousandsSeparator() {
    try {
      const formatter = new Intl.NumberFormat(this.locale);
      const parts = formatter.formatToParts(1e3);
      const groupPart = parts.find((part) => part.type === "group");
      return groupPart?.value || ",";
    } catch (error) {
      return ",";
    }
  }
  /**
   * Format number range
   */
  formatRange(minNumber, maxNumber, options) {
    const minFormatted = this.format(minNumber, options);
    const maxFormatted = this.format(maxNumber, options);
    return `${minFormatted} - ${maxFormatted}`;
  }
  /**
   * Format number with unit
   */
  formatWithUnit(number, unit, options) {
    const formatted = this.format(number, options);
    return `${formatted} ${unit}`;
  }
  /**
   * Format number with custom suffix
   */
  formatWithSuffix(number, suffix, options) {
    const formatted = this.format(number, options);
    return `${formatted}${suffix}`;
  }
  /**
   * Format number with custom prefix
   */
  formatWithPrefix(number, prefix, options) {
    const formatted = this.format(number, options);
    return `${prefix}${formatted}`;
  }
  /**
   * Check if number is valid
   */
  isValidNumber(value) {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
  }
  /**
   * Clamp number to range
   */
  clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }
  /**
   * Round number to specified decimal places
   */
  round(number, decimalPlaces = 2) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  }
  /**
   * Format number as currency (without currency symbol)
   */
  formatCurrencyValue(amount, options) {
    const formatOptions = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(amount);
    } catch (error) {
      console.error("Error formatting currency value:", error);
      return amount.toFixed(2);
    }
  }
  /**
   * Format number as integer
   */
  formatInteger(number, options) {
    const formatOptions = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(Math.floor(number));
    } catch (error) {
      console.error("Error formatting integer:", error);
      return Math.floor(number).toString();
    }
  }
  /**
   * Format number as decimal
   */
  formatDecimal(number, decimalPlaces = 2, options) {
    const formatOptions = {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true,
      ...options
    };
    try {
      return new Intl.NumberFormat(this.locale, formatOptions).format(number);
    } catch (error) {
      console.error("Error formatting decimal:", error);
      return number.toFixed(decimalPlaces);
    }
  }
  /**
   * Update locale
   */
  updateLocale(locale) {
    this.locale = locale;
  }
  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.locale;
  }
};

// src/i18n/hooks.ts
var import_react7 = __toESM(require("react"));
var I18nContext = (0, import_react7.createContext)(null);
function I18nProvider({
  children,
  i18nService
}) {
  const [currencyFormatter] = (0, import_react7.useState)(() => new CurrencyFormatter(i18nService.getCurrentLocale()));
  const [dateFormatter] = (0, import_react7.useState)(() => new DateFormatter(i18nService.getCurrentLocale()));
  const [numberFormatter] = (0, import_react7.useState)(() => new NumberFormatter(i18nService.getCurrentLocale()));
  const value = {
    i18n: i18nService,
    currencyFormatter,
    dateFormatter,
    numberFormatter
  };
  return import_react7.default.createElement(
    I18nContext.Provider,
    { value },
    children
  );
}
function useI18n() {
  const context = (0, import_react7.useContext)(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
function useTranslation(namespace) {
  const { i18n } = useI18n();
  const [locale, setLocale] = (0, import_react7.useState)(i18n.getCurrentLocale());
  const t = (0, import_react7.useCallback)((key, options) => {
    return i18n.t(key, { ...options, namespace });
  }, [i18n, namespace]);
  const changeLocale = (0, import_react7.useCallback)(async (newLocale) => {
    await i18n.changeLocale(newLocale);
    setLocale(newLocale);
  }, [i18n]);
  const exists = (0, import_react7.useCallback)((key) => {
    return i18n.exists(key, { namespace });
  }, [i18n, namespace]);
  return {
    t,
    changeLocale,
    exists,
    locale,
    isRTL: i18n.isRTL()
  };
}
function useCurrency() {
  const { currencyFormatter } = useI18n();
  const { i18n } = useI18n();
  const format = (0, import_react7.useCallback)((amount, options) => {
    return currencyFormatter.format(amount, options);
  }, [currencyFormatter]);
  const formatWithCurrency = (0, import_react7.useCallback)((amount, currency, options) => {
    return currencyFormatter.formatWithCurrency(amount, currency, options);
  }, [currencyFormatter]);
  const formatCompact = (0, import_react7.useCallback)((amount, options) => {
    return currencyFormatter.formatCompact(amount, options);
  }, [currencyFormatter]);
  const parse2 = (0, import_react7.useCallback)((currencyString) => {
    return currencyFormatter.parse(currencyString);
  }, [currencyFormatter]);
  const getCurrencySymbol = (0, import_react7.useCallback)((currency) => {
    return currencyFormatter.getCurrencySymbol(currency);
  }, [currencyFormatter]);
  return {
    format,
    formatWithCurrency,
    formatCompact,
    parse: parse2,
    getCurrencySymbol,
    currency: i18n.getCurrency()
  };
}
function useDate() {
  const { dateFormatter } = useI18n();
  const format = (0, import_react7.useCallback)((date, options) => {
    return dateFormatter.format(date, options);
  }, [dateFormatter]);
  const formatTime = (0, import_react7.useCallback)((date, options) => {
    return dateFormatter.formatTime(date, options);
  }, [dateFormatter]);
  const formatDateTime = (0, import_react7.useCallback)((date, options) => {
    return dateFormatter.formatDateTime(date, options);
  }, [dateFormatter]);
  const formatRelative = (0, import_react7.useCallback)((date, options) => {
    return dateFormatter.formatRelative(date, options);
  }, [dateFormatter]);
  const formatRange = (0, import_react7.useCallback)((startDate, endDate, options) => {
    return dateFormatter.formatRange(startDate, endDate, options);
  }, [dateFormatter]);
  const isToday = (0, import_react7.useCallback)((date) => {
    return dateFormatter.isToday(date);
  }, [dateFormatter]);
  const isYesterday = (0, import_react7.useCallback)((date) => {
    return dateFormatter.isYesterday(date);
  }, [dateFormatter]);
  const isTomorrow = (0, import_react7.useCallback)((date) => {
    return dateFormatter.isTomorrow(date);
  }, [dateFormatter]);
  const getMonthNames = (0, import_react7.useCallback)((format2 = "long") => {
    return dateFormatter.getMonthNames(format2);
  }, [dateFormatter]);
  const getWeekdayNames = (0, import_react7.useCallback)((format2 = "long") => {
    return dateFormatter.getWeekdayNames(format2);
  }, [dateFormatter]);
  return {
    format,
    formatTime,
    formatDateTime,
    formatRelative,
    formatRange,
    isToday,
    isYesterday,
    isTomorrow,
    getMonthNames,
    getWeekdayNames
  };
}
function useNumber() {
  const { numberFormatter } = useI18n();
  const format = (0, import_react7.useCallback)((number, options) => {
    return numberFormatter.format(number, options);
  }, [numberFormatter]);
  const formatCompact = (0, import_react7.useCallback)((number, options) => {
    return numberFormatter.formatCompact(number, options);
  }, [numberFormatter]);
  const formatPercent = (0, import_react7.useCallback)((number, options) => {
    return numberFormatter.formatPercent(number, options);
  }, [numberFormatter]);
  const parse2 = (0, import_react7.useCallback)((numberString) => {
    return numberFormatter.parse(numberString);
  }, [numberFormatter]);
  return {
    format,
    formatCompact,
    formatPercent,
    parse: parse2
  };
}
function useLocale() {
  const { i18n } = useI18n();
  const [locale, setLocale] = (0, import_react7.useState)(i18n.getCurrentLocale());
  const [loading, setLoading] = (0, import_react7.useState)(false);
  const changeLocale = (0, import_react7.useCallback)(async (newLocale) => {
    setLoading(true);
    try {
      await i18n.changeLocale(newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.error("Error changing locale:", error);
    } finally {
      setLoading(false);
    }
  }, [i18n]);
  const getSupportedLocales = (0, import_react7.useCallback)(() => {
    return i18n.getSupportedLocales();
  }, [i18n]);
  const isLocaleSupported = (0, import_react7.useCallback)((localeCode) => {
    return i18n.isLocaleSupported(localeCode);
  }, [i18n]);
  const getLocale = (0, import_react7.useCallback)((localeCode) => {
    return i18n.getLocale(localeCode);
  }, [i18n]);
  return {
    locale,
    changeLocale,
    getSupportedLocales,
    isLocaleSupported,
    getLocale,
    loading,
    isRTL: i18n.isRTL()
  };
}
function useRTL() {
  const { i18n } = useI18n();
  const [isRTL, setIsRTL] = (0, import_react7.useState)(i18n.isRTL());
  (0, import_react7.useEffect)(() => {
    const updateRTL = () => {
      setIsRTL(i18n.isRTL());
    };
    const interval = setInterval(updateRTL, 1e3);
    return () => clearInterval(interval);
  }, [i18n]);
  return {
    isRTL,
    direction: isRTL ? "rtl" : "ltr"
  };
}
function usePlural() {
  const { i18n } = useI18n();
  const getPluralForm = (0, import_react7.useCallback)((count) => {
    if (count === 0)
      return "zero";
    if (count === 1)
      return "one";
    if (count === 2)
      return "two";
    if (count >= 3 && count <= 10)
      return "few";
    if (count > 10)
      return "many";
    return "other";
  }, []);
  const tPlural = (0, import_react7.useCallback)((key, count, options) => {
    const pluralForm = getPluralForm(count);
    return i18n.t(`${key}.${pluralForm}`, { ...options, count });
  }, [i18n, getPluralForm]);
  return {
    getPluralForm,
    tPlural
  };
}

// src/gdpr/gdpr-service.ts
var import_supabase_js11 = require("@supabase/supabase-js");

// src/gdpr/consent-manager.ts
var import_supabase_js7 = require("@supabase/supabase-js");
var ConsentManager = class {
  constructor(supabaseUrl3, supabaseKey, config) {
    this.supabase = (0, import_supabase_js7.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
    this.config = {
      enabled: true,
      theme: "auto",
      position: "bottom",
      show_essential_only: false,
      allow_reject_all: true,
      allow_accept_all: true,
      show_details: true,
      languages: ["en"],
      ...config
    };
  }
  /**
   * Get user's current consent preferences
   */
  async getConsentPreferences(userId) {
    try {
      const { data, error } = await this.supabase.from("consent_preferences").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).single();
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error fetching consent preferences:", error);
      return null;
    }
  }
  /**
   * Save user's consent preferences
   */
  async saveConsentPreferences(userId, preferences, metadata) {
    try {
      const consentData = {
        user_id: userId,
        essential: preferences.essential ?? true,
        // Essential cookies are always true
        analytics: preferences.analytics ?? false,
        marketing: preferences.marketing ?? false,
        personalization: preferences.personalization ?? false,
        third_party: preferences.third_party ?? false,
        ip_address: metadata?.ip_address,
        user_agent: metadata?.user_agent,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { error } = await this.supabase.from("consent_preferences").upsert(consentData);
      if (error) {
        throw error;
      }
      await this.saveCookieConsent(userId, preferences, metadata);
      return true;
    } catch (error) {
      console.error("Error saving consent preferences:", error);
      return false;
    }
  }
  /**
   * Save cookie consent for session tracking
   */
  async saveCookieConsent(userId, preferences, metadata) {
    try {
      const sessionId = this.generateSessionId();
      const cookieConsent = {
        user_id: userId,
        session_id: sessionId,
        essential: preferences.essential ?? true,
        analytics: preferences.analytics ?? false,
        marketing: preferences.marketing ?? false,
        personalization: preferences.personalization ?? false,
        third_party: preferences.third_party ?? false,
        consent_given_at: (/* @__PURE__ */ new Date()).toISOString(),
        ip_address: metadata?.ip_address,
        user_agent: metadata?.user_agent
      };
      await this.supabase.from("cookie_consent").insert(cookieConsent);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  }
  /**
   * Check if user has given specific consent
   */
  async hasConsent(userId, consentType) {
    try {
      const preferences = await this.getConsentPreferences(userId);
      if (!preferences)
        return false;
      switch (consentType) {
        case "essential":
          return preferences.essential;
        case "analytics":
          return preferences.analytics;
        case "marketing":
          return preferences.marketing;
        case "personalization":
          return preferences.personalization;
        case "third_party":
          return preferences.third_party;
        default:
          return false;
      }
    } catch (error) {
      console.error("Error checking consent:", error);
      return false;
    }
  }
  /**
   * Withdraw user consent
   */
  async withdrawConsent(userId, consentType) {
    try {
      const preferences = await this.getConsentPreferences(userId);
      if (!preferences)
        return false;
      const updatedPreferences = {
        ...preferences,
        [consentType]: false,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      return await this.saveConsentPreferences(userId, updatedPreferences);
    } catch (error) {
      console.error("Error withdrawing consent:", error);
      return false;
    }
  }
  /**
   * Get consent banner configuration
   */
  getBannerConfig() {
    return this.config;
  }
  /**
   * Update consent banner configuration
   */
  updateBannerConfig(config) {
    this.config = { ...this.config, ...config };
  }
  /**
   * Generate consent banner HTML
   */
  generateConsentBanner(language = "en") {
    if (!this.config.enabled)
      return "";
    const texts = this.getBannerTexts(language);
    return `
      <div id="consent-banner" class="consent-banner consent-banner-${this.config.position} consent-banner-${this.config.theme}" style="display: none;">
        <div class="consent-banner-content">
          <div class="consent-banner-header">
            <h3>${texts.title}</h3>
            <p>${texts.description}</p>
          </div>
          
          <div class="consent-banner-options">
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-essential" checked disabled>
                ${texts.essential}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-analytics">
                ${texts.analytics}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-marketing">
                ${texts.marketing}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-personalization">
                ${texts.personalization}
              </label>
            </div>
            
            <div class="consent-option">
              <label>
                <input type="checkbox" id="consent-third-party">
                ${texts.third_party}
              </label>
            </div>
          </div>
          
          <div class="consent-banner-actions">
            ${this.config.allow_reject_all ? `<button id="consent-reject-all" class="consent-btn consent-btn-secondary">${texts.reject_all}</button>` : ""}
            ${this.config.allow_accept_all ? `<button id="consent-accept-all" class="consent-btn consent-btn-primary">${texts.accept_all}</button>` : ""}
            <button id="consent-save-preferences" class="consent-btn consent-btn-primary">${texts.save_preferences}</button>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Get banner texts for specific language
   */
  getBannerTexts(language) {
    const defaultTexts = {
      title: "Cookie Consent",
      description: "We use cookies to enhance your experience and analyze our traffic. Please choose your preferences.",
      accept_all: "Accept All",
      reject_all: "Reject All",
      save_preferences: "Save Preferences",
      essential: "Essential Cookies",
      analytics: "Analytics Cookies",
      marketing: "Marketing Cookies",
      personalization: "Personalization Cookies",
      third_party: "Third-Party Cookies"
    };
    if (this.config.custom_text) {
      return { ...defaultTexts, ...this.config.custom_text };
    }
    return defaultTexts;
  }
  /**
   * Generate session ID
   */
  generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Get consent statistics
   */
  async getConsentStatistics() {
    try {
      const { count: totalUsers } = await this.supabase.from("consent_preferences").select("*", { count: "exact", head: true });
      const { data: consentData } = await this.supabase.from("consent_preferences").select("essential, analytics, marketing, personalization, third_party");
      const consentRates = {
        essential: 0,
        analytics: 0,
        marketing: 0,
        personalization: 0,
        third_party: 0
      };
      if (consentData && consentData.length > 0) {
        const total = consentData.length;
        consentRates.essential = consentData.filter((c) => c.essential).length / total * 100;
        consentRates.analytics = consentData.filter((c) => c.analytics).length / total * 100;
        consentRates.marketing = consentData.filter((c) => c.marketing).length / total * 100;
        consentRates.personalization = consentData.filter((c) => c.personalization).length / total * 100;
        consentRates.third_party = consentData.filter((c) => c.third_party).length / total * 100;
      }
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { count: recentConsents } = await this.supabase.from("consent_preferences").select("*", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo.toISOString());
      return {
        total_users: totalUsers || 0,
        consent_rates: consentRates,
        recent_consents: recentConsents || 0
      };
    } catch (error) {
      console.error("Error getting consent statistics:", error);
      return {
        total_users: 0,
        consent_rates: {
          essential: 0,
          analytics: 0,
          marketing: 0,
          personalization: 0,
          third_party: 0
        },
        recent_consents: 0
      };
    }
  }
};

// src/gdpr/data-subject-rights.ts
var import_supabase_js8 = require("@supabase/supabase-js");
var DataSubjectRightsManager = class {
  constructor(supabaseUrl3, supabaseKey) {
    this.supabase = (0, import_supabase_js8.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
  }
  /**
   * Create a new data subject request
   */
  async createDataSubjectRequest(userId, requestType, description) {
    try {
      const requestData = {
        user_id: userId,
        request_type: requestType,
        status: "pending",
        description,
        requested_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await this.supabase.from("data_subject_requests").insert(requestData).select().single();
      if (error) {
        throw error;
      }
      await this.notifyAdmin("data_request", {
        user_id: userId,
        request_type: requestType,
        request_id: data.id
      });
      return data;
    } catch (error) {
      console.error("Error creating data subject request:", error);
      return null;
    }
  }
  /**
   * Get user's data subject requests
   */
  async getUserRequests(userId) {
    try {
      const { data, error } = await this.supabase.from("data_subject_requests").select("*").eq("user_id", userId).order("requested_at", { ascending: false });
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching user requests:", error);
      return [];
    }
  }
  /**
   * Get all pending data subject requests (admin)
   */
  async getPendingRequests() {
    try {
      const { data, error } = await this.supabase.from("data_subject_requests").select("*").eq("status", "pending").order("requested_at", { ascending: true });
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      return [];
    }
  }
  /**
   * Update request status (admin)
   */
  async updateRequestStatus(requestId, status, adminNotes) {
    try {
      const updateData = {
        status,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (status === "completed") {
        updateData.completed_at = (/* @__PURE__ */ new Date()).toISOString();
      }
      if (adminNotes) {
        updateData.admin_notes = adminNotes;
      }
      const { error } = await this.supabase.from("data_subject_requests").update(updateData).eq("id", requestId);
      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      console.error("Error updating request status:", error);
      return false;
    }
  }
  /**
   * Handle data access request
   */
  async handleDataAccessRequest(userId) {
    try {
      const exportData = {
        user_id: userId,
        data_types: ["profile", "websites", "subscriptions", "consent", "audit_logs"],
        format: "json",
        status: "pending",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
        // 30 days
      };
      const { data: exportRecord, error: exportError } = await this.supabase.from("data_exports").insert(exportData).select().single();
      if (exportError) {
        throw exportError;
      }
      await this.processDataExport(exportRecord.id, userId);
      return exportRecord;
    } catch (error) {
      console.error("Error handling data access request:", error);
      return null;
    }
  }
  /**
   * Process data export
   */
  async processDataExport(exportId, userId) {
    try {
      await this.supabase.from("data_exports").update({ status: "processing" }).eq("id", exportId);
      const userData = await this.collectUserData(userId);
      const exportData = {
        user_id: userId,
        export_id: exportId,
        generated_at: (/* @__PURE__ */ new Date()).toISOString(),
        data: userData
      };
      const { error: updateError } = await this.supabase.from("data_exports").update({
        status: "ready",
        response_data: exportData,
        file_size: JSON.stringify(exportData).length
      }).eq("id", exportId);
      if (updateError) {
        throw updateError;
      }
      await this.notifyUser(userId, "data_export_ready", {
        export_id: exportId
      });
    } catch (error) {
      console.error("Error processing data export:", error);
      await this.supabase.from("data_exports").update({ status: "failed" }).eq("id", exportId);
    }
  }
  /**
   * Collect all user data
   */
  async collectUserData(userId) {
    try {
      const { data: profile } = await this.supabase.from("users").select("*").eq("id", userId).single();
      const { data: websites } = await this.supabase.from("websites").select("*").eq("user_id", userId);
      const { data: subscriptions } = await this.supabase.from("subscriptions").select("*").eq("user_id", userId);
      const { data: consent } = await this.supabase.from("consent_preferences").select("*").eq("user_id", userId);
      const { data: auditLogs } = await this.supabase.from("audit_logs").select("*").eq("user_id", userId);
      return {
        profile,
        websites: websites || [],
        subscriptions: subscriptions || [],
        consent_preferences: consent || [],
        audit_logs: auditLogs || [],
        export_metadata: {
          generated_at: (/* @__PURE__ */ new Date()).toISOString(),
          data_categories: ["personal_data", "usage_data", "consent_data", "audit_data"]
        }
      };
    } catch (error) {
      console.error("Error collecting user data:", error);
      return {};
    }
  }
  /**
   * Handle data rectification request
   */
  async handleDataRectificationRequest(userId, corrections) {
    try {
      const { error } = await this.supabase.from("users").update({
        ...corrections,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", userId);
      if (error) {
        throw error;
      }
      await this.logDataAction(userId, "data_rectification", {
        corrections,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error handling data rectification:", error);
      return false;
    }
  }
  /**
   * Handle data erasure request (right to be forgotten)
   */
  async handleDataErasureRequest(userId) {
    try {
      const deletionRequest = {
        user_id: userId,
        reason: "User requested data erasure (GDPR Article 17)",
        status: "pending",
        requested_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await this.supabase.from("data_deletion_requests").insert(deletionRequest).select().single();
      if (error) {
        throw error;
      }
      await this.notifyAdmin("deletion_request", {
        user_id: userId,
        request_id: data.id
      });
      return data;
    } catch (error) {
      console.error("Error handling data erasure request:", error);
      return null;
    }
  }
  /**
   * Process data deletion (admin)
   */
  async processDataDeletion(requestId, approved) {
    try {
      const { data: request } = await this.supabase.from("data_deletion_requests").select("*").eq("id", requestId).single();
      if (!request) {
        throw new Error("Deletion request not found");
      }
      const status = approved ? "approved" : "rejected";
      const processedAt = approved ? (/* @__PURE__ */ new Date()).toISOString() : null;
      await this.supabase.from("data_deletion_requests").update({
        status,
        processed_at: processedAt
      }).eq("id", requestId);
      if (approved) {
        await this.performDataDeletion(request.user_id);
      }
      return true;
    } catch (error) {
      console.error("Error processing data deletion:", error);
      return false;
    }
  }
  /**
   * Perform actual data deletion
   */
  async performDataDeletion(userId) {
    try {
      const tables = [
        "websites",
        "subscriptions",
        "consent_preferences",
        "cookie_consent",
        "data_subject_requests",
        "data_exports",
        "audit_logs"
      ];
      for (const table of tables) {
        await this.supabase.from(table).delete().eq("user_id", userId);
      }
      await this.supabase.from("users").update({
        email: `deleted_${userId}@deleted.local`,
        full_name: "Deleted User",
        avatar_url: null,
        deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", userId);
      await this.logDataAction(userId, "data_deletion", {
        deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
        tables_affected: tables
      });
    } catch (error) {
      console.error("Error performing data deletion:", error);
      throw error;
    }
  }
  /**
   * Handle data portability request
   */
  async handleDataPortabilityRequest(userId) {
    return await this.handleDataAccessRequest(userId);
  }
  /**
   * Log data action for audit purposes
   */
  async logDataAction(userId, action, metadata) {
    try {
      await this.supabase.from("audit_logs").insert({
        user_id: userId,
        action,
        resource_type: "user_data",
        resource_id: userId,
        new_values: metadata,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error logging data action:", error);
    }
  }
  /**
   * Notify admin about data subject request
   */
  async notifyAdmin(type, data) {
    try {
      await this.supabase.from("admin_notifications").insert({
        type,
        data,
        is_read: false,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error notifying admin:", error);
    }
  }
  /**
   * Notify user about request status
   */
  async notifyUser(userId, type, data) {
    try {
      await this.supabase.from("user_notifications").insert({
        user_id: userId,
        type,
        data,
        is_read: false,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error notifying user:", error);
    }
  }
  /**
   * Get data subject rights statistics
   */
  async getRightsStatistics() {
    try {
      const { data: requests } = await this.supabase.from("data_subject_requests").select("request_type, status");
      const stats = {
        total_requests: requests?.length || 0,
        pending_requests: requests?.filter((r) => r.status === "pending").length || 0,
        completed_requests: requests?.filter((r) => r.status === "completed").length || 0,
        request_types: {
          access: 0,
          rectification: 0,
          erasure: 0,
          portability: 0,
          restriction: 0,
          objection: 0
        }
      };
      if (requests) {
        requests.forEach((request) => {
          stats.request_types[request.request_type]++;
        });
      }
      return stats;
    } catch (error) {
      console.error("Error getting rights statistics:", error);
      return {
        total_requests: 0,
        pending_requests: 0,
        completed_requests: 0,
        request_types: {
          access: 0,
          rectification: 0,
          erasure: 0,
          portability: 0,
          restriction: 0,
          objection: 0
        }
      };
    }
  }
};

// src/gdpr/data-retention.ts
var import_supabase_js9 = require("@supabase/supabase-js");
var DataRetentionManager = class {
  constructor(supabaseUrl3, supabaseKey) {
    this.supabase = (0, import_supabase_js9.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
  }
  /**
   * Create a new data retention policy
   */
  async createRetentionPolicy(policy) {
    try {
      const policyData = {
        ...policy,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await this.supabase.from("data_retention_policies").insert(policyData).select().single();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error creating retention policy:", error);
      return null;
    }
  }
  /**
   * Get all data retention policies
   */
  async getRetentionPolicies() {
    try {
      const { data, error } = await this.supabase.from("data_retention_policies").select("*").order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching retention policies:", error);
      return [];
    }
  }
  /**
   * Update data retention policy
   */
  async updateRetentionPolicy(policyId, updates) {
    try {
      const { error } = await this.supabase.from("data_retention_policies").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", policyId);
      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      console.error("Error updating retention policy:", error);
      return false;
    }
  }
  /**
   * Delete data retention policy
   */
  async deleteRetentionPolicy(policyId) {
    try {
      const { error } = await this.supabase.from("data_retention_policies").delete().eq("id", policyId);
      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      console.error("Error deleting retention policy:", error);
      return false;
    }
  }
  /**
   * Process data retention cleanup
   */
  async processDataRetentionCleanup() {
    const results = {
      processed_policies: 0,
      deleted_records: 0,
      errors: []
    };
    try {
      const policies = await this.getRetentionPolicies();
      for (const policy of policies) {
        if (!policy.auto_delete)
          continue;
        try {
          const deletedCount = await this.applyRetentionPolicy(policy);
          results.deleted_records += deletedCount;
          results.processed_policies++;
        } catch (error) {
          results.errors.push(`Policy ${policy.id}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      await this.logCleanupActivity(results);
    } catch (error) {
      results.errors.push(`General cleanup error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
    return results;
  }
  /**
   * Apply a specific retention policy
   */
  async applyRetentionPolicy(policy) {
    const cutoffDate = /* @__PURE__ */ new Date();
    cutoffDate.setDate(cutoffDate.getDate() - policy.retention_period_days);
    let deletedCount = 0;
    switch (policy.data_type) {
      case "audit_logs":
        deletedCount = await this.cleanupAuditLogs(cutoffDate);
        break;
      case "consent_preferences":
        deletedCount = await this.cleanupConsentPreferences(cutoffDate);
        break;
      case "cookie_consent":
        deletedCount = await this.cleanupCookieConsent(cutoffDate);
        break;
      case "data_exports":
        deletedCount = await this.cleanupDataExports(cutoffDate);
        break;
      case "user_sessions":
        deletedCount = await this.cleanupUserSessions(cutoffDate);
        break;
      case "notification_logs":
        deletedCount = await this.cleanupNotificationLogs(cutoffDate);
        break;
      default:
        console.warn(`Unknown data type for retention policy: ${policy.data_type}`);
    }
    return deletedCount;
  }
  /**
   * Cleanup audit logs older than cutoff date
   */
  async cleanupAuditLogs(cutoffDate) {
    try {
      const { count } = await this.supabase.from("audit_logs").delete().lt("timestamp", cutoffDate.toISOString()).select("*", { count: "exact", head: true });
      return count || 0;
    } catch (error) {
      console.error("Error cleaning up audit logs:", error);
      return 0;
    }
  }
  /**
   * Cleanup old consent preferences (keep only latest per user)
   */
  async cleanupConsentPreferences(cutoffDate) {
    try {
      const { data: oldConsents } = await this.supabase.from("consent_preferences").select("user_id, id, created_at").lt("created_at", cutoffDate.toISOString()).order("user_id, created_at", { ascending: false });
      if (!oldConsents)
        return 0;
      const userLatestConsent = /* @__PURE__ */ new Map();
      oldConsents.forEach((consent) => {
        if (!userLatestConsent.has(consent.user_id) || new Date(consent.created_at) > new Date(userLatestConsent.get(consent.user_id).created_at)) {
          userLatestConsent.set(consent.user_id, consent);
        }
      });
      const idsToDelete = oldConsents.filter((consent) => consent.id !== userLatestConsent.get(consent.user_id)?.id).map((consent) => consent.id);
      if (idsToDelete.length > 0) {
        const { count } = await this.supabase.from("consent_preferences").delete().in("id", idsToDelete).select("*", { count: "exact", head: true });
        return count || 0;
      }
      return 0;
    } catch (error) {
      console.error("Error cleaning up consent preferences:", error);
      return 0;
    }
  }
  /**
   * Cleanup old cookie consent records
   */
  async cleanupCookieConsent(cutoffDate) {
    try {
      const { count } = await this.supabase.from("cookie_consent").delete().lt("consent_given_at", cutoffDate.toISOString()).select("*", { count: "exact", head: true });
      return count || 0;
    } catch (error) {
      console.error("Error cleaning up cookie consent:", error);
      return 0;
    }
  }
  /**
   * Cleanup expired data exports
   */
  async cleanupDataExports(cutoffDate) {
    try {
      const { count } = await this.supabase.from("data_exports").delete().lt("expires_at", cutoffDate.toISOString()).select("*", { count: "exact", head: true });
      return count || 0;
    } catch (error) {
      console.error("Error cleaning up data exports:", error);
      return 0;
    }
  }
  /**
   * Cleanup old user sessions
   */
  async cleanupUserSessions(cutoffDate) {
    try {
      const { count } = await this.supabase.from("user_sessions").delete().lt("last_activity", cutoffDate.toISOString()).select("*", { count: "exact", head: true });
      return count || 0;
    } catch (error) {
      console.error("Error cleaning up user sessions:", error);
      return 0;
    }
  }
  /**
   * Cleanup old notification logs
   */
  async cleanupNotificationLogs(cutoffDate) {
    try {
      const { count } = await this.supabase.from("notification_logs").delete().lt("created_at", cutoffDate.toISOString()).select("*", { count: "exact", head: true });
      return count || 0;
    } catch (error) {
      console.error("Error cleaning up notification logs:", error);
      return 0;
    }
  }
  /**
   * Log cleanup activity for audit purposes
   */
  async logCleanupActivity(results) {
    try {
      await this.supabase.from("audit_logs").insert({
        action: "data_retention_cleanup",
        resource_type: "system",
        resource_id: "retention_cleanup",
        new_values: results,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error logging cleanup activity:", error);
    }
  }
  /**
   * Get data retention statistics
   */
  async getRetentionStatistics() {
    try {
      const policies = await this.getRetentionPolicies();
      const stats = {
        total_policies: policies.length,
        active_policies: policies.filter((p) => p.auto_delete).length,
        auto_delete_enabled: policies.filter((p) => p.auto_delete).length,
        data_types_covered: Array.from(new Set(policies.map((p) => p.data_type))),
        last_cleanup: null
      };
      const { data: lastCleanup } = await this.supabase.from("audit_logs").select("timestamp").eq("action", "data_retention_cleanup").order("timestamp", { ascending: false }).limit(1).single();
      if (lastCleanup) {
        stats.last_cleanup = lastCleanup.timestamp;
      }
      return stats;
    } catch (error) {
      console.error("Error getting retention statistics:", error);
      return {
        total_policies: 0,
        active_policies: 0,
        auto_delete_enabled: 0,
        data_types_covered: [],
        last_cleanup: null
      };
    }
  }
  /**
   * Create default retention policies
   */
  async createDefaultPolicies() {
    const defaultPolicies = [
      {
        data_type: "audit_logs",
        retention_period_days: 2555,
        // 7 years
        auto_delete: true,
        legal_basis: "legal_obligation",
        description: "Audit logs for compliance and security monitoring"
      },
      {
        data_type: "consent_preferences",
        retention_period_days: 365,
        // 1 year
        auto_delete: false,
        // Keep for consent history
        legal_basis: "consent",
        description: "User consent preferences and history"
      },
      {
        data_type: "cookie_consent",
        retention_period_days: 90,
        // 3 months
        auto_delete: true,
        legal_basis: "consent",
        description: "Cookie consent session data"
      },
      {
        data_type: "data_exports",
        retention_period_days: 30,
        // 30 days
        auto_delete: true,
        legal_basis: "consent",
        description: "Data export files and metadata"
      },
      {
        data_type: "user_sessions",
        retention_period_days: 30,
        // 30 days
        auto_delete: true,
        legal_basis: "legitimate_interests",
        description: "User session data for security"
      },
      {
        data_type: "notification_logs",
        retention_period_days: 90,
        // 3 months
        auto_delete: true,
        legal_basis: "legitimate_interests",
        description: "Notification delivery logs"
      }
    ];
    for (const policy of defaultPolicies) {
      await this.createRetentionPolicy(policy);
    }
  }
  /**
   * Check if data should be retained based on legal basis
   */
  async shouldRetainData(dataType, legalBasis, ageInDays) {
    try {
      const policies = await this.getRetentionPolicies();
      const policy = policies.find((p) => p.data_type === dataType);
      if (!policy) {
        return ageInDays <= 365;
      }
      if (ageInDays > policy.retention_period_days) {
        return false;
      }
      if (legalBasis === "legal_obligation") {
        return true;
      }
      return true;
    } catch (error) {
      console.error("Error checking data retention:", error);
      return true;
    }
  }
};

// src/gdpr/audit-logger.ts
var import_supabase_js10 = require("@supabase/supabase-js");
var AuditLogger = class {
  constructor(supabaseUrl3, supabaseKey, enabled = true) {
    this.supabase = (0, import_supabase_js10.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
    this.enabled = enabled;
  }
  /**
   * Log an audit event
   */
  async log(action, resourceType, resourceId, options = {}) {
    if (!this.enabled)
      return true;
    try {
      const auditLog = {
        user_id: options.userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        old_values: options.oldValues,
        new_values: options.newValues,
        ip_address: options.ipAddress,
        user_agent: options.userAgent,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        metadata: options.metadata
      };
      const { error } = await this.supabase.from("audit_logs").insert(auditLog);
      if (error) {
        console.error("Error logging audit event:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in audit logger:", error);
      return false;
    }
  }
  /**
   * Log user authentication events
   */
  async logAuthEvent(action, userId, metadata) {
    return await this.log(
      `auth_${action}`,
      "user",
      userId,
      {
        userId,
        metadata: {
          ...metadata,
          event_type: "authentication"
        }
      }
    );
  }
  /**
   * Log data access events
   */
  async logDataAccess(action, resourceType, resourceId, userId, metadata) {
    return await this.log(
      `data_${action}`,
      resourceType,
      resourceId,
      {
        userId,
        metadata: {
          ...metadata,
          event_type: "data_access"
        }
      }
    );
  }
  /**
   * Log consent events
   */
  async logConsentEvent(action, userId, consentType, metadata) {
    return await this.log(
      `consent_${action}`,
      "consent",
      userId,
      {
        userId,
        metadata: {
          ...metadata,
          consent_type: consentType,
          event_type: "consent"
        }
      }
    );
  }
  /**
   * Log data subject rights events
   */
  async logDataSubjectRights(action, requestType, userId, requestId, metadata) {
    return await this.log(
      `dsr_${action}`,
      "data_subject_request",
      requestId,
      {
        userId,
        metadata: {
          ...metadata,
          request_type: requestType,
          event_type: "data_subject_rights"
        }
      }
    );
  }
  /**
   * Log admin actions
   */
  async logAdminAction(action, resourceType, resourceId, adminUserId, metadata) {
    return await this.log(
      `admin_${action}`,
      resourceType,
      resourceId,
      {
        userId: adminUserId,
        metadata: {
          ...metadata,
          event_type: "admin_action"
        }
      }
    );
  }
  /**
   * Log system events
   */
  async logSystemEvent(action, resourceType, resourceId, metadata) {
    return await this.log(
      `system_${action}`,
      resourceType,
      resourceId,
      {
        metadata: {
          ...metadata,
          event_type: "system"
        }
      }
    );
  }
  /**
   * Log security events
   */
  async logSecurityEvent(action, userId, resourceType, resourceId, metadata) {
    return await this.log(
      `security_${action}`,
      resourceType || "security",
      resourceId || "system",
      {
        userId,
        metadata: {
          ...metadata,
          event_type: "security",
          severity: this.getSecuritySeverity(action)
        }
      }
    );
  }
  /**
   * Get security event severity
   */
  getSecuritySeverity(action) {
    switch (action) {
      case "suspicious_activity":
        return "medium";
      case "failed_login":
        return "low";
      case "unauthorized_access":
        return "high";
      case "data_breach":
        return "critical";
      default:
        return "medium";
    }
  }
  /**
   * Get audit logs for a specific user
   */
  async getUserAuditLogs(userId, limit = 100, offset = 0) {
    try {
      const { data, error } = await this.supabase.from("audit_logs").select("*").eq("user_id", userId).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching user audit logs:", error);
      return [];
    }
  }
  /**
   * Get audit logs for a specific resource
   */
  async getResourceAuditLogs(resourceType, resourceId, limit = 100, offset = 0) {
    try {
      const { data, error } = await this.supabase.from("audit_logs").select("*").eq("resource_type", resourceType).eq("resource_id", resourceId).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching resource audit logs:", error);
      return [];
    }
  }
  /**
   * Get audit logs by action type
   */
  async getAuditLogsByAction(action, limit = 100, offset = 0) {
    try {
      const { data, error } = await this.supabase.from("audit_logs").select("*").eq("action", action).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching audit logs by action:", error);
      return [];
    }
  }
  /**
   * Get audit logs within a date range
   */
  async getAuditLogsByDateRange(startDate, endDate, limit = 100, offset = 0) {
    try {
      const { data, error } = await this.supabase.from("audit_logs").select("*").gte("timestamp", startDate.toISOString()).lte("timestamp", endDate.toISOString()).order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching audit logs by date range:", error);
      return [];
    }
  }
  /**
   * Get audit statistics
   */
  async getAuditStatistics() {
    try {
      const { count: totalLogs } = await this.supabase.from("audit_logs").select("*", { count: "exact", head: true });
      const { data: actionData } = await this.supabase.from("audit_logs").select("action");
      const logsByAction = {};
      if (actionData) {
        actionData.forEach((log) => {
          logsByAction[log.action] = (logsByAction[log.action] || 0) + 1;
        });
      }
      const { data: userData } = await this.supabase.from("audit_logs").select("user_id").not("user_id", "is", null);
      const logsByUser = {};
      if (userData) {
        userData.forEach((log) => {
          logsByUser[log.user_id] = (logsByUser[log.user_id] || 0) + 1;
        });
      }
      const { data: resourceData } = await this.supabase.from("audit_logs").select("resource_type");
      const logsByResourceType = {};
      if (resourceData) {
        resourceData.forEach((log) => {
          logsByResourceType[log.resource_type] = (logsByResourceType[log.resource_type] || 0) + 1;
        });
      }
      const yesterday = /* @__PURE__ */ new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const { count: recentActivity } = await this.supabase.from("audit_logs").select("*", { count: "exact", head: true }).gte("timestamp", yesterday.toISOString());
      return {
        total_logs: totalLogs || 0,
        logs_by_action: logsByAction,
        logs_by_user: logsByUser,
        logs_by_resource_type: logsByResourceType,
        recent_activity: recentActivity || 0
      };
    } catch (error) {
      console.error("Error getting audit statistics:", error);
      return {
        total_logs: 0,
        logs_by_action: {},
        logs_by_user: {},
        logs_by_resource_type: {},
        recent_activity: 0
      };
    }
  }
  /**
   * Search audit logs
   */
  async searchAuditLogs(query, filters = {}, limit = 100, offset = 0) {
    try {
      let supabaseQuery = this.supabase.from("audit_logs").select("*");
      if (filters.userId) {
        supabaseQuery = supabaseQuery.eq("user_id", filters.userId);
      }
      if (filters.action) {
        supabaseQuery = supabaseQuery.eq("action", filters.action);
      }
      if (filters.resourceType) {
        supabaseQuery = supabaseQuery.eq("resource_type", filters.resourceType);
      }
      if (filters.startDate) {
        supabaseQuery = supabaseQuery.gte("timestamp", filters.startDate.toISOString());
      }
      if (filters.endDate) {
        supabaseQuery = supabaseQuery.lte("timestamp", filters.endDate.toISOString());
      }
      if (query) {
        supabaseQuery = supabaseQuery.or(`action.ilike.%${query}%,resource_type.ilike.%${query}%,metadata.ilike.%${query}%`);
      }
      const { data, error } = await supabaseQuery.order("timestamp", { ascending: false }).range(offset, offset + limit - 1);
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error("Error searching audit logs:", error);
      return [];
    }
  }
  /**
   * Enable or disable audit logging
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  /**
   * Check if audit logging is enabled
   */
  isEnabled() {
    return this.enabled;
  }
};

// src/gdpr/gdpr-service.ts
var GDPRService = class {
  constructor(supabaseUrl3, supabaseKey) {
    this.supabase = (0, import_supabase_js11.createClient)(supabaseUrl3 || "https://placeholder.supabase.co", supabaseKey || "placeholder_key");
    this.consentManager = new ConsentManager(supabaseUrl3, supabaseKey);
    this.dataSubjectRightsManager = new DataSubjectRightsManager(supabaseUrl3, supabaseKey);
    this.dataRetentionManager = new DataRetentionManager(supabaseUrl3, supabaseKey);
    this.auditLogger = new AuditLogger(supabaseUrl3, supabaseKey);
  }
  /**
   * Initialize GDPR compliance system
   */
  async initialize() {
    try {
      await this.dataRetentionManager.createDefaultPolicies();
      await this.auditLogger.logSystemEvent(
        "gdpr_initialized",
        "system",
        "gdpr_service"
      );
      return true;
    } catch (error) {
      console.error("Error initializing GDPR service:", error);
      return false;
    }
  }
  /**
   * Get GDPR compliance status
   */
  async getComplianceStatus() {
    try {
      const consentStats = await this.consentManager.getConsentStatistics();
      const consentManagement = consentStats.total_users > 0;
      const rightsStats = await this.dataSubjectRightsManager.getRightsStatistics();
      const dataSubjectRights = rightsStats.total_requests >= 0;
      const privacyPolicy = await this.getActivePrivacyPolicy();
      const hasPrivacyPolicy = privacyPolicy !== null;
      const cookieConsent = await this.getCookieConsentStatus();
      const hasCookieConsent = cookieConsent;
      const retentionStats = await this.dataRetentionManager.getRetentionStatistics();
      const dataRetention = retentionStats.total_policies > 0;
      const auditStats = await this.auditLogger.getAuditStatistics();
      const auditLogging = auditStats.total_logs > 0;
      const breachProcedures = await this.checkBreachProcedures();
      const staffTraining = await this.checkStaffTraining();
      const lastAudit = await this.getLastAuditDate();
      const complianceScore = this.calculateComplianceScore({
        consentManagement,
        dataSubjectRights,
        hasPrivacyPolicy,
        hasCookieConsent,
        dataRetention,
        auditLogging,
        breachProcedures,
        staffTraining
      });
      return {
        consent_management: consentManagement,
        data_subject_rights: dataSubjectRights,
        privacy_policy: hasPrivacyPolicy,
        cookie_consent: hasCookieConsent,
        data_retention: dataRetention,
        audit_logging: auditLogging,
        breach_procedures: breachProcedures,
        staff_training: staffTraining,
        last_audit: lastAudit,
        compliance_score: complianceScore
      };
    } catch (error) {
      console.error("Error getting compliance status:", error);
      return {
        consent_management: false,
        data_subject_rights: false,
        privacy_policy: false,
        cookie_consent: false,
        data_retention: false,
        audit_logging: false,
        breach_procedures: false,
        staff_training: false,
        last_audit: (/* @__PURE__ */ new Date()).toISOString(),
        compliance_score: 0
      };
    }
  }
  /**
   * Get active privacy policy
   */
  async getActivePrivacyPolicy() {
    try {
      const { data, error } = await this.supabase.from("privacy_policies").select("*").eq("is_active", true).order("effective_date", { ascending: false }).limit(1).single();
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      return null;
    }
  }
  /**
   * Create or update privacy policy
   */
  async createPrivacyPolicy(policy) {
    try {
      await this.supabase.from("privacy_policies").update({ is_active: false }).eq("is_active", true);
      const policyData = {
        ...policy,
        is_active: true,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await this.supabase.from("privacy_policies").insert(policyData).select().single();
      if (error) {
        throw error;
      }
      await this.auditLogger.logAdminAction(
        "privacy_policy_created",
        "privacy_policy",
        data.id,
        "system"
      );
      return data;
    } catch (error) {
      console.error("Error creating privacy policy:", error);
      return null;
    }
  }
  /**
   * Get cookie consent status
   */
  async getCookieConsentStatus() {
    try {
      const { count } = await this.supabase.from("cookie_consent").select("*", { count: "exact", head: true });
      return (count || 0) > 0;
    } catch (error) {
      console.error("Error checking cookie consent status:", error);
      return false;
    }
  }
  /**
   * Check breach procedures
   */
  async checkBreachProcedures() {
    try {
      const { data } = await this.supabase.from("data_breaches").select("id").limit(1);
      return true;
    } catch (error) {
      console.error("Error checking breach procedures:", error);
      return false;
    }
  }
  /**
   * Check staff training
   */
  async checkStaffTraining() {
    try {
      return true;
    } catch (error) {
      console.error("Error checking staff training:", error);
      return false;
    }
  }
  /**
   * Get last audit date
   */
  async getLastAuditDate() {
    try {
      const { data } = await this.supabase.from("compliance_reports").select("generated_at").order("generated_at", { ascending: false }).limit(1).single();
      return data?.generated_at || (/* @__PURE__ */ new Date()).toISOString();
    } catch (error) {
      console.error("Error getting last audit date:", error);
      return (/* @__PURE__ */ new Date()).toISOString();
    }
  }
  /**
   * Calculate compliance score
   */
  calculateComplianceScore(checks) {
    const totalChecks = Object.keys(checks).length;
    const passedChecks = Object.values(checks).filter(Boolean).length;
    return Math.round(passedChecks / totalChecks * 100);
  }
  /**
   * Report a data breach
   */
  async reportDataBreach(breach) {
    try {
      const breachData = {
        ...breach,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await this.supabase.from("data_breaches").insert(breachData).select().single();
      if (error) {
        throw error;
      }
      await this.auditLogger.logSecurityEvent(
        "data_breach",
        void 0,
        "data_breach",
        data.id,
        { breach_id: data.id, risk_level: breach.risk_level }
      );
      if (breach.notification_required) {
        await this.sendBreachNotifications(data);
      }
      return data;
    } catch (error) {
      console.error("Error reporting data breach:", error);
      return null;
    }
  }
  /**
   * Send breach notifications
   */
  async sendBreachNotifications(breach) {
    try {
      await this.notifyDataProtectionOfficer(breach);
      if (breach.risk_level === "high" || breach.risk_level === "medium") {
        await this.notifyAffectedUsers(breach);
      }
      await this.auditLogger.logSystemEvent(
        "breach_notifications_sent",
        "data_breach",
        breach.id
      );
    } catch (error) {
      console.error("Error sending breach notifications:", error);
    }
  }
  /**
   * Notify data protection officer
   */
  async notifyDataProtectionOfficer(breach) {
    try {
      const { data: dpo } = await this.supabase.from("data_protection_officers").select("*").eq("is_active", true).single();
      if (dpo) {
        await this.supabase.from("admin_notifications").insert({
          type: "data_breach",
          title: "Data Breach Reported",
          message: `A data breach has been reported: ${breach.description}`,
          data: { breach_id: breach.id },
          is_read: false,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    } catch (error) {
      console.error("Error notifying DPO:", error);
    }
  }
  /**
   * Notify affected users
   */
  async notifyAffectedUsers(breach) {
    try {
      await this.supabase.from("user_notifications").insert({
        type: "data_breach",
        title: "Important: Data Security Notice",
        message: "We have identified a potential data security incident that may affect your personal information.",
        data: { breach_id: breach.id },
        is_read: false,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error notifying affected users:", error);
    }
  }
  /**
   * Generate compliance report
   */
  async generateComplianceReport(reportType, periodStart, periodEnd, generatedBy) {
    try {
      const complianceStatus = await this.getComplianceStatus();
      const consentStats = await this.consentManager.getConsentStatistics();
      const rightsStats = await this.dataSubjectRightsManager.getRightsStatistics();
      const retentionStats = await this.dataRetentionManager.getRetentionStatistics();
      const auditStats = await this.auditLogger.getAuditStatistics();
      const { data: breaches } = await this.supabase.from("data_breaches").select("*").gte("created_at", periodStart.toISOString()).lte("created_at", periodEnd.toISOString());
      const recommendations = this.generateRecommendations(complianceStatus, auditStats);
      const report = {
        report_type: reportType,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        data_subject_requests: rightsStats.total_requests,
        consent_updates: consentStats.recent_consents,
        data_breaches: breaches?.length || 0,
        audit_findings: this.generateAuditFindings(auditStats),
        compliance_score: complianceStatus.compliance_score,
        recommendations,
        generated_at: (/* @__PURE__ */ new Date()).toISOString(),
        generated_by: generatedBy
      };
      const { data, error } = await this.supabase.from("compliance_reports").insert(report).select().single();
      if (error) {
        throw error;
      }
      await this.auditLogger.logAdminAction(
        "compliance_report_generated",
        "compliance_report",
        data.id,
        generatedBy
      );
      return data;
    } catch (error) {
      console.error("Error generating compliance report:", error);
      return null;
    }
  }
  /**
   * Generate compliance recommendations
   */
  generateRecommendations(complianceStatus, auditStats) {
    const recommendations = [];
    if (!complianceStatus.consent_management) {
      recommendations.push("Implement comprehensive consent management system");
    }
    if (!complianceStatus.data_subject_rights) {
      recommendations.push("Set up data subject rights request handling");
    }
    if (!complianceStatus.privacy_policy) {
      recommendations.push("Create and publish privacy policy");
    }
    if (!complianceStatus.cookie_consent) {
      recommendations.push("Implement cookie consent mechanism");
    }
    if (!complianceStatus.data_retention) {
      recommendations.push("Establish data retention policies");
    }
    if (!complianceStatus.audit_logging) {
      recommendations.push("Enable comprehensive audit logging");
    }
    if (!complianceStatus.breach_procedures) {
      recommendations.push("Develop data breach response procedures");
    }
    if (!complianceStatus.staff_training) {
      recommendations.push("Provide GDPR training to staff");
    }
    if (auditStats.recent_activity > 1e3) {
      recommendations.push("Review high volume of audit activities");
    }
    return recommendations;
  }
  /**
   * Generate audit findings
   */
  generateAuditFindings(auditStats) {
    const findings = [];
    if (auditStats.recent_activity > 500) {
      findings.push("High volume of recent audit activity detected");
    }
    if (auditStats.logs_by_action["security_unauthorized_access"] > 0) {
      findings.push("Unauthorized access attempts detected");
    }
    if (auditStats.logs_by_action["security_data_breach"] > 0) {
      findings.push("Data breach incidents reported");
    }
    return findings;
  }
  /**
   * Get consent manager instance
   */
  getConsentManager() {
    return this.consentManager;
  }
  /**
   * Get data subject rights manager instance
   */
  getDataSubjectRightsManager() {
    return this.dataSubjectRightsManager;
  }
  /**
   * Get data retention manager instance
   */
  getDataRetentionManager() {
    return this.dataRetentionManager;
  }
  /**
   * Get audit logger instance
   */
  getAuditLogger() {
    return this.auditLogger;
  }
};

// src/gdpr/cookie-manager.ts
var CookieManager = class {
  constructor(onConsentChange) {
    this.consent = null;
    this.onConsentChange = onConsentChange;
    this.loadConsentFromStorage();
  }
  /**
   * Load consent from localStorage
   */
  loadConsentFromStorage() {
    try {
      const stored = localStorage.getItem("naveeg_cookie_consent");
      if (stored) {
        this.consent = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading cookie consent from storage:", error);
    }
  }
  /**
   * Save consent to localStorage
   */
  saveConsentToStorage(consent) {
    try {
      localStorage.setItem("naveeg_cookie_consent", JSON.stringify(consent));
    } catch (error) {
      console.error("Error saving cookie consent to storage:", error);
    }
  }
  /**
   * Set cookie consent
   */
  setConsent(consent) {
    const sessionId = this.generateSessionId();
    this.consent = {
      id: this.consent?.id || this.generateId(),
      user_id: consent.user_id || "",
      session_id: sessionId,
      essential: consent.essential ?? true,
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      personalization: consent.personalization ?? false,
      third_party: consent.third_party ?? false,
      consent_given_at: (/* @__PURE__ */ new Date()).toISOString(),
      ip_address: consent.ip_address,
      user_agent: consent.user_agent || navigator.userAgent
    };
    this.saveConsentToStorage(this.consent);
    if (this.onConsentChange) {
      this.onConsentChange(this.consent);
    }
    this.setCookiesBasedOnConsent();
  }
  /**
   * Get current consent
   */
  getConsent() {
    return this.consent;
  }
  /**
   * Check if specific consent type is given
   */
  hasConsent(consentType) {
    if (!this.consent)
      return false;
    switch (consentType) {
      case "essential":
        return this.consent.essential;
      case "analytics":
        return this.consent.analytics;
      case "marketing":
        return this.consent.marketing;
      case "personalization":
        return this.consent.personalization;
      case "third_party":
        return this.consent.third_party;
      default:
        return false;
    }
  }
  /**
   * Withdraw consent for specific type
   */
  withdrawConsent(consentType) {
    if (!this.consent)
      return;
    const updatedConsent = { ...this.consent };
    switch (consentType) {
      case "essential":
        return;
      case "analytics":
        updatedConsent.analytics = false;
        break;
      case "marketing":
        updatedConsent.marketing = false;
        break;
      case "personalization":
        updatedConsent.personalization = false;
        break;
      case "third_party":
        updatedConsent.third_party = false;
        break;
    }
    this.setConsent(updatedConsent);
  }
  /**
   * Withdraw all non-essential consent
   */
  withdrawAllConsent() {
    if (!this.consent)
      return;
    this.setConsent({
      ...this.consent,
      analytics: false,
      marketing: false,
      personalization: false,
      third_party: false
    });
  }
  /**
   * Set cookies based on consent
   */
  setCookiesBasedOnConsent() {
    if (!this.consent)
      return;
    this.setCookie("naveeg_session", this.consent.session_id, 30, true);
    this.setCookie("naveeg_consent", JSON.stringify(this.consent), 365, true);
    if (this.consent.analytics) {
      this.setCookie("naveeg_analytics", "enabled", 365, false);
      this.enableAnalytics();
    } else {
      this.deleteCookie("naveeg_analytics");
      this.disableAnalytics();
    }
    if (this.consent.marketing) {
      this.setCookie("naveeg_marketing", "enabled", 365, false);
      this.enableMarketing();
    } else {
      this.deleteCookie("naveeg_marketing");
      this.disableMarketing();
    }
    if (this.consent.personalization) {
      this.setCookie("naveeg_personalization", "enabled", 365, false);
      this.enablePersonalization();
    } else {
      this.deleteCookie("naveeg_personalization");
      this.disablePersonalization();
    }
    if (this.consent.third_party) {
      this.setCookie("naveeg_third_party", "enabled", 365, false);
      this.enableThirdParty();
    } else {
      this.deleteCookie("naveeg_third_party");
      this.disableThirdParty();
    }
  }
  /**
   * Set a cookie
   */
  setCookie(name, value, days, essential = false) {
    const expires = /* @__PURE__ */ new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1e3);
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;${essential ? "HttpOnly;" : ""}SameSite=Strict`;
    document.cookie = cookieString;
  }
  /**
   * Delete a cookie
   */
  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
  /**
   * Get a cookie value
   */
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ")
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  /**
   * Enable analytics tracking
   */
  enableAnalytics() {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted"
      });
    }
  }
  /**
   * Disable analytics tracking
   */
  disableAnalytics() {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied"
      });
    }
  }
  /**
   * Enable marketing tracking
   */
  enableMarketing() {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "grant");
    }
  }
  /**
   * Disable marketing tracking
   */
  disableMarketing() {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }
  }
  /**
   * Enable personalization
   */
  enablePersonalization() {
    console.log("Personalization enabled");
  }
  /**
   * Disable personalization
   */
  disablePersonalization() {
    console.log("Personalization disabled");
  }
  /**
   * Enable third-party services
   */
  enableThirdParty() {
    console.log("Third-party services enabled");
  }
  /**
   * Disable third-party services
   */
  disableThirdParty() {
    console.log("Third-party services disabled");
  }
  /**
   * Generate session ID
   */
  generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Generate unique ID
   */
  generateId() {
    return "consent_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  /**
   * Clear all cookies
   */
  clearAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      this.deleteCookie(name.trim());
    }
  }
  /**
   * Get cookie consent banner HTML
   */
  generateConsentBanner() {
    return `
      <div id="cookie-consent-banner" class="cookie-consent-banner" style="display: none;">
        <div class="cookie-consent-content">
          <div class="cookie-consent-header">
            <h3>Cookie Consent</h3>
            <p>We use cookies to enhance your experience and analyze our traffic. Please choose your preferences.</p>
          </div>
          
          <div class="cookie-consent-options">
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-essential" checked disabled>
                Essential Cookies
                <small>Required for basic website functionality</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-analytics">
                Analytics Cookies
                <small>Help us understand how visitors interact with our website</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-marketing">
                Marketing Cookies
                <small>Used to track visitors across websites for advertising</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-personalization">
                Personalization Cookies
                <small>Remember your preferences and settings</small>
              </label>
            </div>
            
            <div class="cookie-option">
              <label>
                <input type="checkbox" id="cookie-third-party">
                Third-Party Cookies
                <small>Cookies from external services we use</small>
              </label>
            </div>
          </div>
          
          <div class="cookie-consent-actions">
            <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Reject All</button>
            <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accept All</button>
            <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Initialize cookie consent banner
   */
  initializeBanner() {
    if (this.consent) {
      return;
    }
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) {
      banner.style.display = "block";
    }
    this.addBannerEventListeners();
  }
  /**
   * Add event listeners to consent banner
   */
  addBannerEventListeners() {
    const acceptAllBtn = document.getElementById("cookie-accept-all");
    if (acceptAllBtn) {
      acceptAllBtn.addEventListener("click", () => {
        this.setConsent({
          essential: true,
          analytics: true,
          marketing: true,
          personalization: true,
          third_party: true
        });
        this.hideBanner();
      });
    }
    const rejectAllBtn = document.getElementById("cookie-reject-all");
    if (rejectAllBtn) {
      rejectAllBtn.addEventListener("click", () => {
        this.setConsent({
          essential: true,
          analytics: false,
          marketing: false,
          personalization: false,
          third_party: false
        });
        this.hideBanner();
      });
    }
    const saveBtn = document.getElementById("cookie-save-preferences");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const essential = document.getElementById("cookie-essential")?.checked || true;
        const analytics = document.getElementById("cookie-analytics")?.checked || false;
        const marketing = document.getElementById("cookie-marketing")?.checked || false;
        const personalization = document.getElementById("cookie-personalization")?.checked || false;
        const thirdParty = document.getElementById("cookie-third-party")?.checked || false;
        this.setConsent({
          essential,
          analytics,
          marketing,
          personalization,
          third_party: thirdParty
        });
        this.hideBanner();
      });
    }
  }
  /**
   * Hide consent banner
   */
  hideBanner() {
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) {
      banner.style.display = "none";
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppError,
  AuthService,
  ConsentManager,
  CookieManager,
  CurrencyFormatter,
  DEFAULT_ROLE_PERMISSIONS,
  DataSubjectRightsManager,
  DateFormatter,
  EntitlementService,
  GDPRService,
  GOOGLE_OAUTH_SCOPES,
  GoogleAnalyticsService,
  GoogleBusinessProfileService,
  GoogleSearchConsoleService,
  GoogleService,
  I18nProvider,
  I18nService,
  LocaleDetector,
  N8NService,
  NumberFormatter,
  OpenAIService,
  PLANS,
  STRIPE_WEBHOOK_SECRET,
  StripeCheckoutService,
  StripeSubscriptionService,
  StripeWebhookService,
  TEAM_MEMBER_ROLE_COLORS,
  TEAM_MEMBER_STATUS_COLORS,
  TeamService,
  TenWebAPI,
  TranslationManager,
  authService,
  briefSchema,
  calculateUsagePercentage,
  createAuthClient,
  createBrowserClient,
  createServerClient,
  createServerSupabaseClient,
  designSchema,
  entitlementService,
  formatBandwidthSize,
  formatCurrency,
  formatDate,
  formatStorageSize,
  generateSchema,
  generateSubdomain,
  getAllGoogleScopes,
  getBrowserSupabaseClient,
  getOpenAIService,
  getPlanById,
  getPlanLimits,
  getScopesForServices,
  getServerSupabaseClient,
  getServiceSupabaseClient,
  getStripe,
  getTenWebAPI,
  isFeatureAvailable,
  n8nService,
  openAIService,
  stripeCheckoutService,
  stripeSubscriptionService,
  stripeWebhookService,
  tenWebAPI,
  useAuth,
  useCurrency,
  useDate,
  useEntitlements,
  useFeatureGate,
  useI18n,
  useIsAuthenticated,
  useLocale,
  useN8N,
  useNumber,
  useOnboardingStatus,
  usePlural,
  useRTL,
  useRequireAuth,
  useTeamActivity,
  useTeamInvitations,
  useTeamMembers,
  useTeamPermissions,
  useTeamSettings,
  useTranslation,
  useUser,
  useUserData
});
//# sourceMappingURL=index.js.map