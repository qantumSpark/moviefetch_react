
/*
* Chaque item de localStorage est une collection
collectionName : [ {  }, {  }, {  }, ... ]
test:
newCollection(Partition)
*/


export function newCollection(name) {
  let stored = window.localStorage.getItem(name)
  if(stored !== null) return console.error("!ERROR! A collection with this name already exist");
  window.localStorage.setItem(name, "[]")
  let collection = {name: name, items : []}
  return collection
}

export function getCollection(name) {
  const collection = JSON.parse(window.localStorage.getItem(name))
  if(collection === null) return console.error("!ERROR! No collection of this name found");
  return collection
}

export function getItem(collectionName, id){
  const collection = getCollection(collectionName)
  let item = collection.filter(e => e.id === id)
  return item[0]
}

export function addItem(collectionName, item){
  
  const collection = getCollection(collectionName)

  if(collection.filter(e => e.id === item.id).length !== 0) return console.error("!ERROR! Item already exist in the collection, use updateItem instead");

  collection.push(item)
  updateCollection(collectionName, collection)
  return collection
}

export function updateItem(collectionName, id, newItem){
  if(typeof(newItem.id) !== "string") newItem.id = id
  const collection = getCollection(collectionName)
  collection.forEach((item, idx) => {
    if (item.id === id){
      collection[idx] = newItem
      console.log("Item updated!")
      updateCollection(collectionName, collection)
      return collection
    }
  })
  return collection
}

export function deleteItem(collectionName, id){
  const collection = getCollection(collectionName)
  let newCollection = collection.filter(e => e.id !== id)
  updateCollection(collectionName, newCollection)
  return newCollection
}

export function updateCollection(collectionName, newCollection){
  const collection = JSON.stringify(newCollection)
  window.localStorage.setItem(collectionName, collection)
}