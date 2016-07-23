
var nearWaterObject : GameObject = null;
var farWaterObject : GameObject = null;

var near : boolean;

function Awake() 
{
	UpdateVisibility();
}

function OnTriggerEnter()
{
	near = true;
	UpdateVisibility();
}

function OnTriggerExit()
{
	near = false;
	UpdateVisibility();
}

function UpdateVisibility()
{
	nearWaterObject.Getcomponent(Renderer).enabled = near;
	farWaterObject.Getcomponent(Renderer).enabled = !near;
}
	
	
