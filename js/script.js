
            // this functiion  handles the informaion retrieved from the DOm and Dom altering
            const UiController = (() => {

                const getDom =  {
                    inputType: '.form',
                    inputDescription:'.description',
                    inputAssigned: '.assigned',
                    issuesInputBtn: '.create--issues'                    
                }
            
                
                return{

                    domInput: () => {
                        return {
                            type:document.querySelector(getDom.inputType).value,
                            description: document.querySelector(getDom.inputDescription).value, 
                            assigned: document.querySelector(getDom.inputAssigned).value
                        }
                    },

                    allDom :() => getDom
                };
            })()


            
            
            //              this function handles the data aninputValuet Issues
            const dataController = (() => {

            
                class Items {
                    constructor(description, piority, assigned) {
                        this.description = description;
                        this.piority = piority;
                        this.assigned = assigned;
                    }
                }
                        // Creating an array for all the created the elements for easy sorting
                
                const data = {
                    allItems: {
                        high: [],
                        mid: [],
                        low: []
                        },
                }

                return {
                    // creating new items, item are grouped according to piority
     createItems: (description, piority) => {

                        if (piority === 'high') {
                            Items = new Items();
                                  }

                             else  if (piority === 'medium') {
                                 Items = new Expenses();
                                      }

                            else if (piority === 'low') {
                                Items = new Expenses();
                            }

        // Pushing the newly created   income or expenses into our array
            data.allItems[piority].push(newItem);

            // returning the newly created element 
            return newItem;
                }


    }
     })()
            
            
            
                            // This function comm. between the function and control all functions can not run independently.
 const trackerController = ((uiCtrl, dataCtrl) => {
            
     const init = () => {
            let getDom = uiCtrl.allDom();

            document.querySelector(getDom.issuesInputBtn).addEventListener('click', ctrlAddItem);

            document.addEventListener('keypress', function () {
                if( event.keycode === 13 && event.which === 13 ){ctrlAddItem(); }

                    })
        
    }


             const ctrlAddItem = () => {
                 const domInput = uiCtrl.domInput();
                console.log(domInput);   

                if(domInput.description !== "" && domInput.assigned !== ""){

                    console.log('Not MT');
                  var newItem = dataController.createItems(domInput.description, domInput.piority, domInput.assigned );
                  console.log(newItem);
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