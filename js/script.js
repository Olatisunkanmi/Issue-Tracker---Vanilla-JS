

            // this functiion  handles the informaion retrieved from the DOm and Dom altering
            const UiController = (() => {

                const getAllDom =  {
                    inputType: '.add--type',
                    inputDescription:'.description',
                    inputAssigned: '.assigned',
                    issuesInputBtn: '.create--issues',
                    lowDiv: '.Low-div',
                    midDiv: '.Mid-div',
                    highDiv: '.High-div',
                    delContainer: '.tickets--div',
                    arrNo: '.entry-Id'
                }
            
                
          return{

                            domInput: () => {
                                return {

                                    description: document.querySelector(getAllDom.inputDescription).value, 
                                    type:document.querySelector(getAllDom.inputType).value,
                                    assigned: document.querySelector(getAllDom.inputAssigned).value
                                }
                            },

                            allDom :() => {
                                return getAllDom;
                            },

                                        /**
                                         * this function accepts piority, and the array of the newly create Item to input into the doM.
                                         * this is the function that access the DOM
                                         * 
                                         */
                            addListItem: (type, newItem) => {
                                
                            let html, element, newHtml;
                                        if (type === 'High') {                                
                                        element = getAllDom.highDiv;
                                            html = '<div id="High-%id" class="High"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority">%Priority</p>' +
                                            '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                            '<button class="btn btn-warning"> Close </button><button class="btn btn-danger delete">Delete</button></div>'
                                                                        
                                    }   
                                    
                                    else if(type === 'Medium'){
                                   
                                    element = getAllDom.midDiv;
                                    html = '<div id="Medium-%id" class="Medium"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority">%Priority</p>' +
                                    '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                    '<button class="btn btn-warning"> Close </button><button class="btn btn-danger delete">Delete</button></div>'
                                           
                                }  
                                
                                else if(type === 'Low'){
                                    element = getAllDom.lowDiv;
                                    html = '<div id="Low-%id" class="Low"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority">%Priority</p>' +
                                            '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                            '<button class="btn btn-warning"> Close </button> <button class="btn btn-danger delete">Delete</button> </div>'
                                                   
                                }
                               
                                newHtml = html.replace('%id', newItem.id);
                                newHtml = newHtml.replace('%description', newItem.des);
                                newHtml = newHtml.replace('%Assigned', newItem.assigned);
                                newHtml = newHtml.replace('%Priority', type);
                                

                                document.querySelector(element).insertAdjacentHTML('beforeend' ,newHtml);
                                
                          },

                          updateUi: (pNode, ID) => {
                              let html, container, newHtml
                                const el = document.getElementById(pNode);
                                el.parentNode.removeChild(el);

                          },

                          updateArrayNo: (ID) => {  
                        
                            
                        document.querySelector(getAllDom.arrNo).textContent = ID;

                          },

                          clearInputtFields: () => {
                              let arrFields, field;

                              field = document.querySelectorAll(getAllDom.inputDescription + ',' + getAllDom.inputAssigned);
                            //   console.log(field);  

                              arrFields = Array.prototype.slice.call(field);
                              
                              arrFields.forEach(current => current.value = '');

                              arrFields[0].focus();
                          }
                          
              
              }   /* closing braces for the return function*/  
     })()
                

                   

                        /**
                         * A closure functon to accept data and arrange Items
                         * created Items are set into arrays and given their ID for sorting
                         */
            
            
            //              this function handles the data aninputValuet Issues
            const dataController = (() => {

            
                class allItemsFunc {
                    constructor(id, des , assigned) {
                        this.id = id;
                        this.des = des;
                        this.assigned = assigned;
                    }
                }
                        // Creating an array for all the created the elements for easy sorting
                
                const data = {
                    allItems: {
                        High: [],
                        Medium: [],
                        Low: []
                        },
                }

                return {
                    // creating new items, item are grouped according to piority
                     createItems: (type, des, assigned) => {
                let newItem, ID,index, ids;
    //----->>>>  ----->>>>>  ------->>>>>>>>    ------<<<<<<--------
                                        if (data.allItems[type].length > 0) {
                                            ID = data.allItems[type][data.allItems[type].length -1].id +1;
                                            
                            
                                        } else {
                                            ID = 0;
                                        
                                        }
                                        
                                
                            if (type === 'High') {
                            newItem = new allItemsFunc(ID, des, assigned);
                                }

                                else  if (type === 'Medium') {
                                    newItem = new allItemsFunc(ID, des, assigned);
                                }

                                else if (type === 'Low') {
                                    newItem = new allItemsFunc(ID, des, assigned);
                                }
                //  -------------->>>>>>>> ----->>>>>>>>>>>>>------------>>>>>>>><<<<<<<
                        // Pushing the newly created   income or expenses into our array              
                                data.allItems[type].push(newItem);
                                // console.log(data.allItems[type]);

                                // data.allItems.length
                           
                                
                                // console.log( data.allItems[type]);
                            // returning the newly created element 
                            return newItem;
                                },

                deleteItems: (type, id) => {
                    let ids, index;
                    ids = data.allItems[type].map(current => current.id)
                    
                    /**'ids' is the current array that returns the current Id 
                     * to delete an element of an array well.
                     * deleting the index of the item is what we need to do.
                     */
                    index = ids.indexOf(id);
                    

                    /**
                     * but after the 'index' is set to the ['ids.indexOf(id)' which is 0]
                     */
                    // console.log(index);
                   
                    /**  the index of an empty array is usually -1
                     * 
                     * but we set index to 0
                     *                  'ids.indexOf(id)'
                     *
                     */
                    if(index !== -1){
                        /**if true. remove the delete the array index set to 0
                         */
                        data.allItems[type].splice(index, 1);
                    }
                },

                updateItems : (id, type) => {
                    let High, Mid, Low, arrayNo, ids;

                    High = parseInt(data.allItems['High'].length);
                    Mid = parseInt(data.allItems['Medium'].length);
                    Low = parseInt(data.allItems['Low'].length);
                        
                    arrayNo = (High + Mid) + Low;

                    return arrayNo;


                    /*
                    ids = data.allItems;
                    console.log(ids);
                    ids = data.allItems[type].map((current) => {
                        current.id
                         for (const cur of data.allItems[type]) {
                         return data.allItems[type].length
                    }
                    })
                    const newArr = (...ids) => {
                        console.log(ids);
                        const element = ids.indexOf(ids)
                        for (let i = 0; i < ids.length; i++) {
                            const element = ids.indexof(i);
                                console.log(element);
                        }
                        
                        console.log(element);

                        
                    }
                          
                    newArr(ids)
                    */
                }


    }   
     })()
            
            
            
                            // This function comm. between the function and control all functions can not run independently.
  const trackerController = ((uiCtrl, dataController) => {

                            const init = () => {

                                // Getting the DOM strings 
                            let getAllDom = uiCtrl.allDom();
                                document.querySelector(getAllDom.issuesInputBtn).addEventListener("click", ctrlAddItem);
                                document.querySelector(getAllDom.delContainer).addEventListener("click", ctrlDelItem);
                                document.addEventListener('keypress', (event) => {
                                    if(event.keypress === 13 || event.which === 13){
                                        ctrlAddItem()
                                    }
                                })
                              

                            }


const ctrlAddItem = () => {
                
                    const domInput = uiCtrl.domInput();
                    // {domInput.description, domInput.medium, domInput.assigned } : domInput
                    if(domInput.description !== "" && domInput.assigned !== ""){ 

                            /* Using the %priority of the tasks, description and assigned to 
                                to create item and save each of them in an array
                                
                                so each item can be located easily for sorting.
                                */
                    const createItems = dataController.createItems(domInput.type, domInput.description, domInput.assigned)
                    // console.log(createItems.id);
                        /*
                        this function sends the piory to the other function to input into Dom
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 HI !! My name is Olasunkanmi                     <<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                         */     
                  uiCtrl.addListItem(domInput.type, createItems);
                  updateNoArr(dataController, createItems.id, domInput.type);
                  
                    uiCtrl.clearInputtFields()
                                     }
                            
        }


        const ctrlDelItem = (event) => {
            let pNode, type, ID, splitNode;
            pNode = event.target.parentNode.id;
           
        if (pNode) {
            splitNode = pNode.split('-');
            type = splitNode[0];
            ID = parseInt(splitNode[1]);
            
            /**
             * Delete Item from the data.allItems[type]
             */
                dataController.deleteItems(type, ID);
                updateNoArr(dataController, type, ID);
                
                /* Update Ui by also deleting 
                the Div of the deleted Ui from the user interface.
             */

                uiCtrl.updateUi(pNode);
                         }
           
        }   

        const  updateNoArr = (dataController, type, ID) => {
            const updateArrayNo = dataController.updateItems(type, ID);

            uiCtrl.updateArrayNo(updateArrayNo);
        }
        



                

                
        return{
                    initialize: () => {
                            console.log('Application is running');
                            init();
                        
                    }
                }
            
            })(UiController, dataController);


trackerController.initialize();

