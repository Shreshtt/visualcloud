(function($) {
  $.widget("environment.RailsResource", {
    onElementDrop: function(params){
      //Look in app/views/environments/_dialogs.html.erb to see all dialogs
      //or to add a dialog for a new resource type
      var droppedElement = params.args.helper ;
      var stage = params.droppable;
      var droppedPosition = {} ;
      droppedPosition.top = droppedElement.position().top - stage.position().top ;
      droppedPosition.left = droppedElement.position().left - stage.position().left ;
      showConfigurationForm('rails-configuration', droppedPosition);
    }
  });
})(jQuery);

//RAILS configuration submit
$(document).ready(function(){
  //Add event listeners to Submit button of instance configuration popin
  $('div#rails-configuration .instance-config-submit').click(function(){
    var xpos = $('#rails-configuration').data('xpos');
    var ypos = $('#rails-configuration').data('ypos');
    var editElement = $('#rails-configuration').data('editElement');
    var label = $('input#rails_label').val().trim();
    var parents_list = $('#rails_parents_list').val();
    var amiId = parseInt($('#rails_ami_id').val());
    var InstanceTypeId = parseInt($('#rails_instance_type_id').html());
    var config_attributes = {roles:['app','rails'], parents_list:parents_list};
    if ( validateRAILSConfig(label) ){
      if (editElement == null) {
        var newInstance = addInstanceCloneToGraph();
        newInstance.instance({xpos: xpos, ypos: ypos, label: label, resourceType: 'Rails', amiId: amiId, InstanceType: InstanceTypeId, configAttributes: config_attributes});
      }
      else {
        var existingInstance = $('#'+editElement);
        existingInstance.instance("option", {label: label, amiId: amiId, InstanceType: InstanceTypeId, configAttributes: config_attributes});
      }
      $('#rails-configuration').modal('hide');
    }
    return false;
  });

});

//Validation for RAILS configuration
function validateRAILSConfig(label){
    if(label == "")
    {
      addMessagesToDiv($('#rails-config-error-messages'), getErrorMessage('Label cannot be empty'));
      return false;
    }
    else
     return true;
};
