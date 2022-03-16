            // this functiion  handles the informaion retrieved from the DOm and Dom altering

            const UiController = (() => {

                const getDom =  {
                    InputDescription:'.description',
            
                }
            
            
            })()
            
            
            //              this function handles the data and properties of the created Items
            
            const dataController = (() => {
                // Add an Id number to every new Isses created 
            //              ID numbers can be easily used to delete and sort Issues
                
            
            
            })()
            
            
            
                            // This function comm. between the function and control all functions can not run independently.
            const trackerController = ((Uictrl) => {
            
             
            
                return{
                    initialize: () => {
            
                    }
                }
            
            })(UiController);
            
            trackerController.initialize();