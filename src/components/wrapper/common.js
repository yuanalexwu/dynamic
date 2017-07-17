export function mergeOption (option, defaultValue) {
  const [defaultId] = defaultValue
  // remove default value if exists
  const newOption = option.filter(elem => elem[0] !== defaultId)
  newOption.unshift(defaultValue)
  return newOption
}
