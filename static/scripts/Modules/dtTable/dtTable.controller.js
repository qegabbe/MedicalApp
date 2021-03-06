

angular.module('sbAdminApp')
  .controller('dtTableController', ['$scope','GenericService',dtTableController])
;

/** 
* @namespace dtTableController
*/
function dtTableController( $scope, GenericService) {

    var vm = this;
	// Initialize Post-Options
	vm.PostOptions = {};
	
	$scope.columnDefs = [];
	$scope.columns = [];
	$scope.Items = [];
    $scope.ListName = "List";

    // Define Columns Layout - via API OPTIONS Request
	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().then(function(options) {
			if(options.data!== undefined) {
				// Name of the List
				$scope.ListName = options.data.name;
				// Retrieve Post-Options
				vm.PostOptions =  options.data.actions.POST; 
				// Get Data
				vm.reloadData(); 				
			}
		});
	};
	
    // Get Items-List
    vm.reloadData = function() {
		// Retrieve All Data
		if(vm.PostOptions !=={}) {
			GenericService.query().then(function(response) {
				// if Data-Results exists
				var data = response.data; 
				$scope.columnDefs = [];
				$scope.columns = [];			
				if(data.count>0) {
					// Get Options
					$scope.Items = data.results;
					vm.ColumnsData = Object.keys($scope.Items[0]);
					
					for(var i=0; i< vm.ColumnsData.length; i++) {
						// hide type -fields to be shown
						if (vm.PostOptions[vm.ColumnsData[i]].type == "field") {
							if(vm.ColumnsData[i] =="url") {
								$scope.columnDefs.push({"sTitle": "Actions","aTargets":[i],
														"bVisible":true,
														"mData": null,
														//"className": 'select-checkbox',
														//"sDefaultContent": '<button><a href="'+vm.ColumnsData[i]+'">Download</a></button>',
														"sDefaultContent": '<button type="button" class="btn btn-primary btn-circle"><i class="glyphicon glyphicon-edit"></i></button>',
													});
							} else {
								$scope.columnDefs.push({"sTitle": "","aTargets":[i],
														"bVisible":false,
														"mData": null
													});								
							}
						} else {
							$scope.columnDefs.push({"mData": vm.ColumnsData[i],
													"sTitle": vm.ColumnsData[i],
													"aTargets":[i]
												   });
							//$scope.columns.push({"mData": vm.ColumnsData[i],"sTitle": vm.ColumnsData[i], "bSearchable": true, "bSortable": true });
						}
					}
				}
			});
		}
    };
	
	// Call Options
    vm.getOptions();
	
	// Link Template to Controller
	$scope.reloadData = vm.reloadData;
	// handle Table Row-Click
	$scope.fnRowCallback = function(aData) {
		if(aData !== undefined) {
			if(aData.url!==undefined) {
				var ViewUrl = aData.url.replace("api","#");
				ViewUrl = ViewUrl.replace("?format=json","");
				// Default redirect to view-path
				ViewUrl += "view/";
				$scope.aData = aData;
				//OpenModalBox();
				window.location.href = ViewUrl;
				//$state.go(EditUrl);	
			}
		}
	};
	
	$scope.addItem = function() {
		// Navigate to add Page 
		var ViewUrl = GenericService.url().replace("api","#");
		ViewUrl = ViewUrl.replace("?format=json","");		
		window.location.href = ViewUrl + "add/";
	};
}