

            // this functiion  handles the informaion retrieved from the DOm and Dom altering
            const UiController = (() => {

                const getAllDom =  {
                    inputType: '.add--type',
                    inputDescription:'.description',
                    inputAssigned: '.assigned',
                    issuesInputBtn: '.create--issues',
                    lowDiv: '.Low-div',
                    midDiv: '.Mid-div',
                    highDiv: '.High-div'
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
                                            html = '<div id="High-%id" class="High"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority"><i class="fas fa-clock"></i>%Priority</p>' +
                                            '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                            '<a href="#"  class="btn btn-warning">Close</a><a href="#"  class="btn btn-danger">Delete</a></div>'
                                                                        
                                    }   
                                    
                                    else if(type === 'Medium'){
                                   
                                    element = getAllDom.midDiv;
                                    html = '<div id="Medium-%id"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority"><i class="fas fa-clock"></i>%Priority</p>' +
                                    '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                    '<a href="#"  class="btn btn-warning">Close</a><a href="#"  class="btn btn-danger">Delete</a></div>'
                                           
                                }  
                                
                                else if(type === 'Low'){
                                    element = getAllDom.lowDiv;
                                    html = '<div id="Low-%id"><h6>Issue ID: </h6><h5 class="status"></h5><p class="priority"><i class="fas fa-clock"></i>%Priority</p>' +
                                            '<h3 class="description--value"> %description</h3><p><i class="fas fa-address-card assigned--value"></i> %Assigned </p>' +
                                            '<a href="#"  class="btn btn-warning">Close</a><a href="#"  class="btn btn-danger">Delete</a></div>'
                                                   
                                }

                                // newHtml = html.replace('%id', newItem.id);
                                newHtml = html.replace('%id', newItem.ID)
                                newHtml = newHtml.replace('%description', newItem.des);
                                newHtml = newHtml.replace('%Assigned', newItem.assigned);
                                newHtml = newHtml.replace('%Priority', type)
                                

                                document.querySelector(element).insertAdjacentHTML('beforeend' ,newHtml);
                                
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
                                            //   console.log(ID);
                            
                                        } else {
                                            ID = 0;
                                            //    console.log(ID);
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
                            ids = data.allItems[type].map(current => {
                                return current.id;
                                });

                                // console.log( data.allItems[type]);
                            // returning the newly created element 
                            return newItem;
                                }


    }   
     })()
            
            
            
                            // This function comm. between the function and control all functions can not run independently.
                        const trackerController = ((uiCtrl, dataController) => {

                            const init = () => {

                                // Getting the DOM strings 
                            let getAllDom = uiCtrl.allDom();
                                document.querySelector(getAllDom.issuesInputBtn).addEventListener("click", function() {
                                ctrlAddItem()

                                    })
                        
                            }


                              const ctrlAddItem = () => {
                
                              const domInput = uiCtrl.domInput();
                // {domInput.description, domInput.medium, domInput.assigned } : domInput
                              if(domInput.description !== "" || domInput.assigned !== ""){  
                              console.log(domInput.type);

                            /* Using the %priority of the tasks, description and assigned to 
                                to create item and save each of them in an array
                                
                                so each item can be located easily for sorting.
                                */


                    const createItems = dataController.createItems(domInput.type, domInput.description, domInput.assigned)
                                console.log(createItems);

                        /*
                        this function sends the piory to the other function to input into Dom
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                 HI !! My name is Olasunkanmi                     <<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                                            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                         */     
                    const addEvents =  uiCtrl.addListItem(domInput.type, createItems);
                                
                       }
             }

                

                
        return{
                    initialize: () => {
                            console.log('Application is running');
                            init();
                        
                    }
                }
            
            })(UiController, dataController);


trackerController.initialize();