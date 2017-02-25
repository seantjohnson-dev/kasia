const NODE_WPAPI_GITHUB_URL = 'http://bit.ly/2adfKKg'
const KASIA_URL = 'http://kasia.io'

function invariant (predicate, message, ...args) {
  if (!predicate) {
    const interpolated = args.reduce((str, arg) => str.replace(/%s/, arg), message)
    const err = new Error('[kasia] ' + interpolated)
    err.framesToPop = 1
    throw err
  }
}

export default {
  isString: (name, value) => invariant(
    typeof value === 'string',
    'Expecting %s to be string, got "%s".',
    name, typeof value
  ),
  isFunction: (name, value) => invariant(
    typeof value === 'function',
    'Expecting %s to be function, got "%s".',
    name, typeof value
  ),
  isPlugin: (name, value) => invariant(
    typeof value === 'function',
    'Expecting %s to be function, got "%s". ' +
    'Please file an issue with the plugin if you ' +
    'think there might be a problem with it.',
    name, typeof value
  ),
  isArray: (name, value) => invariant(
    Array.isArray(value),
    'Expecting %s to be array, got "%s".',
    name, typeof value
  ),
  isBoolean: (name, value) => invariant(
    typeof value === 'object',
    'Expecting %s to be boolean, got "%s".',
    name, typeof value
  ),
  isWpApiInstance: (value = {}) => invariant(
    typeof (value.then || value.registerRoute) === 'function',
    'Expecting WP to be instance of `node-wpapi`. ' +
    `See documentation: ${NODE_WPAPI_GITHUB_URL}.`
  ),
  isIdentifierArg: (identifier) => invariant(
    typeof identifier === 'function' || typeof identifier === 'string' || typeof identifier === 'number',
    'Expecting id given to connectWpPost to be function/string/number, got "%s".',
    typeof identifier
  ),
  isValidContentTypeObject: (obj) => invariant(
    typeof obj.name === 'string' &&
    typeof obj.plural === 'string' &&
    typeof obj.slug === 'string',
    'Invalid content type object. ' +
    `See documentation: ${KASIA_URL}.`
  ),
  isValidContentType: (contentTypeOptions, name, checkStr) => invariant(
    typeof contentTypeOptions !== 'undefined',
    'Content type "%s" is not recognised. ' +
    'Pass built-ins from `kasia/types`, e.g. `connectWpPost(Post, ...)`. ' +
    'Pass the name of custom content types, e.g. `connectWpPost("Book", ...)`. ' +
    'Check %s.',
    name, checkStr
  ),
  isNewContentType: (typesMap, contentType) => invariant(
    typesMap && !typesMap.get(contentType.name),
    'Content type with name "%s" already exists.',
    contentType.name
  ),
  isNotWrapped: (target, displayName) => invariant(
    !target.__kasia,
    '%s is already wrapped by Kasia.',
    displayName
  ),
  isIdentifierValue: (id) => invariant(
    typeof id === 'string' || typeof id === 'number',
    'The final identifier is invalid. ' +
    'Expecting a string or number, got "%s".',
    typeof id
  ),
  hasWordpressObject: (wordpress) => invariant(
    wordpress,
    'No `wordpress` object on the store. ' +
    'Is your store configured correctly? ' +
    `See documentation ${KASIA_URL}.`,
    typeof wordpress
  ),
  queryHasError: (query, displayName) => {
    if (query && query.error) {
      console.log(`[kasia] error in query for ${displayName || 'unknown component'}:\n` + query.error)
    }
  },
  isKeyEntitiesByOption: (keyEntitiesBy) => invariant(
    keyEntitiesBy === 'slug' || keyEntitiesBy === 'id',
    'Expecting keyEntitiesBy to be "slug" or "id", got "%s".',
    keyEntitiesBy
  ),
  notDiscoveryAndContentTypes: (wpapi, contentTypes) => invariant(
    typeof wpapi.then === 'function' && !contentTypes.length ||
    typeof wpapi.then !== 'function' && contentTypes.length,
    'You must use only one of manual custom content type registration or autodiscovery.'
  ),
  instanceHasCustomContentTypeMethod: (wpapi, typeMethod, typeName) => invariant(
    typeof wpapi[typeMethod] === 'function',
    'Method for %s does not exist on node-wpapi instance for "%s" content type.',
    typeMethod, typeName
  )
}
