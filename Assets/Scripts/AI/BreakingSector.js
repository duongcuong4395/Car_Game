var maxBreakTorque : float;
var minCarSpeed : float;


function OnTriggerStay (other : Collider) {
	
	if (other.tag == "AI") {
		var controlCurrentSpeed : float = other.transform.root.GetComponent(AI_Car_Script).currentSpeed;
		if (controlCurrentSpeed >= minCarSpeed) {
			other.transform.root.GetComponent(AI_Car_Script).inSector = true;
			other.transform.root.GetComponent(AI_Car_Script).wheelRR.brakeTorque = maxBreakTorque;
			other.transform.root.GetComponent(AI_Car_Script).wheelRL.brakeTorque = maxBreakTorque;
		}
		else {
			other.transform.root.GetComponent(AI_Car_Script).inSector = false;
			other.transform.root.GetComponent(AI_Car_Script).wheelRR.brakeTorque = 0;
			other.transform.root.GetComponent(AI_Car_Script).wheelRL.brakeTorque = 0;
		}
		other.transform.root.GetComponent(AI_Car_Script).isBreaking = true;
	}
}

function OnTriggerExit(other : Collider) {
	if (other.tag == "AI") {
		other.transform.root.GetComponent(AI_Car_Script).inSector = false;
		other.transform.root.GetComponent(AI_Car_Script).isBreaking = false;
		other.transform.root.GetComponent(AI_Car_Script).wheelRR.brakeTorque = 0;
		other.transform.root.GetComponent(AI_Car_Script).wheelRL.brakeTorque = 0;
	}
}