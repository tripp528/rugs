
export function update_in(object, value, path) {
  /* Update a leaf value down a path of object keys. */
  let stack = [...path]
  while (stack.length > 1) {
    const k = stack.shift()
    if (!object.hasOwnProperty(k)) {
      object[k] = {}
    }
    object = object[k]
  }

  const key = stack.shift()
  if (value instanceof Function) {
    const new_val = value(object[key])
    // Check if we return a value, if so set the object.
    // This allows us to do things like pass an array, push into and
    // not blow away the value since Array.push doesn't return the array but a length
    if (new_val) {
      object[key] = new_val
    }
  } else {
    object[key] = value
  }
  return object
}


export function get_in(object, path, elseVal=null) {
  let res = object
  for (let x of path) {
    if (!res) {
      return elseVal
    } else if (res.hasOwnProperty(x)) {
      res = res[x]
    } else {
      return res[x] || elseVal
    }
  }
  return res
}


export function is_nullish(val) {
  return (val === null || val === undefined || val === NaN)
}
