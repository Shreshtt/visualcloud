(function($) {
  $.widget("graph.EC2Resource", {
    onElementDrop: function(params){
      console.log('EC2 received element drop');
      //Look in app/views/graphs/_dialogs.html.erb to see all dialogs 
      //or to add a dialog for a new resource type
      var droppedElement = params.args.helper ;
      var stage = params.droppable;
      var droppedPosition = {} ;
      droppedPosition.top = droppedElement.position().top - stage.position().top ;
      droppedPosition.left = droppedElement.position().left - stage.position().left ;
      showConfigurationForm('ec2-configuration', droppedPosition);
    }
  });
})(jQuery);

//EC2 configuration submit
$(document).ready(function(){
  //Add event listeners to Submit button of instance configuration popin
  $('div#ec2-configuration .instance-config-submit').click(function(){
    var xpos = $('#ec2-configuration').data('xpos'); 
    var ypos = $('#ec2-configuration').data('ypos'); 
    var label = $('input#ec2_label').val().trim();
    var amiId = parseInt($('select#ec2_ami_id').val());
    if ( validateEC2Config(label) )
    {
      var newInstance = addInstanceCloneToGraph({ left: xpos, top: ypos });
      newInstance.instance({xpos: xpos, ypos: ypos, label: label, resourceType: 'EC2', amiId: amiId});
      $('#ec2-configuration').modal('hide');
    }
    return false;
  });

});

//Validation for EC2 configuration
function validateEC2Config(label){
    if(label == "")
    {
      addMessagesToDiv($('#ec2-config-error-messages'), getErrorMessage('Label cannot be empty'));
      return false;
    }
    else
     return true;
};
