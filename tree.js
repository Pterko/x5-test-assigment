/**
  Необходимо создать вложенную древовидную структуру категорий.
  {
  "id": 0,
  "childs": [
    {
      "id": 1,
      "childs": [
        {
          "id": 2,
          "childs": [
            {
              "id": 3,
              "childs": [
                {
                  "id": 4,
                  "childs": [
                    {
                      "id": 10,
                      "childs": [
                        {
                          "id": 11,
                          "childs": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": 5,
                  "childs": []
                }
              ]
            },
            {
              "id": 6,
              "childs": []
            },
            {
              "id": 13,
              "childs": []
            }
          ]
        },
        {
          "id": 7,
          "childs": []
        }
      ]
    },
    {
      "id": 8,
      "childs": [
        {
          "id": 12,
          "childs": []
        },
        {
          "id": 14,
          "childs": []
        }
      ]
    },
    {
      "id": 9,
      "childs": []
    }
  ]
}
  
  
**/



const cats = [
  { id: 1, parent: 0 },
  { id: 2, parent: 1 },
  { id: 3, parent: 2 },
  { id: 4, parent: 3 },
  { id: 5, parent: 3 },
  { id: 6, parent: 2 },
  { id: 7, parent: 1 },
  { id: 8, parent: 0 },
  { id: 9, parent: 0 },
  { id: 10, parent: 4 },
  { id: 11, parent: 10 },
  { id: 12, parent: 8 },
  { id: 13, parent: 2 },
  { id: 14, parent: 8 }
];

// we will turn this object into a k-v storage { parent : [childs] }
const map = {};
for (let elem of cats) {
  if (map[elem.parent]) {
    map[elem.parent].push(elem.id);
  } else {
    map[elem.parent] = [elem.id];
  }
}

// console.log('map:', map);

function getTree(map, parentId){
  const result = {
    id: parentId
  };
  if (map[parentId]) {
    result.childs = map[parentId].map(x => getTree(map, x))
  } else {
    result.childs = [];
  }
  return result;
}


const finalObj = getTree(map, 0);


console.log('finalObj', JSON.stringify(finalObj));