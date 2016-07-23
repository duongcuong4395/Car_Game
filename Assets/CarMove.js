#pragma strict

	var car : Transform;

	var  wheelFL : WheelCollider;
	var  wheelFR : WheelCollider;
	var  wheelRL : WheelCollider;
	var  wheelRR : WheelCollider;

	var  wheelFLTrans : Transform;
	var  wheelFRTrans : Transform;
	var  wheelRLTrans : Transform;
	var  wheelRRTrans : Transform;

	var  lowestSteerAtSpeed  : float = 50;
	var  lowSpeedSteerAngel : float = 15;
	var  highSpeedSteerAngel :float = 5;
	var  deceleratationSpeed : float = 25;
	var  maxTorque : float = 1;
	var  currentSpeed : float;
	var  topSpeed : float = 190;
	var  maxReverseSpeed : float = 30;
	var  throttle : float = 0;
	var  maxBrakeTorque : float = 100;

	var  braked : boolean = false;

	var  spotLight : GameObject;

	private var  mySidewayFriction : float;
	private var  myForwardFricTion : float;
	private var  slipSidewayFriction : float;
	private var  slipForwardFriction : float;

	var  brakeLights : Material;


	// Use this for initialization
	function Start () {
		GetComponent(Rigidbody).centerOfMass.x = 0;
		GetComponent(Rigidbody).centerOfMass.y = 0;
		GetComponent(Rigidbody).centerOfMass.z = 0;
		SetValues();
	}

	function SetValues (){
		myForwardFricTion = wheelRR.forwardFriction.stiffness;
		mySidewayFriction = wheelRR.sidewaysFriction.stiffness;

		slipForwardFriction = 0.04;
		slipSidewayFriction = 0.25;
	}
	
	// Update is called once per frame
	function FixedUpdate () {
		Control ();
		HandBrake ();
	}

	function HandBrake(){
		if (Input.GetButton ("Jump")) {
			braked = true;
			maxBrakeTorque = currentSpeed * maxTorque;
		} else {
			braked = false;
			maxBrakeTorque = 100;
		}

		if (braked) {
			wheelFR.brakeTorque = maxBrakeTorque;
			wheelFL.brakeTorque = maxBrakeTorque;
			wheelRR.motorTorque = 0;
			wheelRL.motorTorque = 0;
			if (GetComponent(Rigidbody).velocity.magnitude > 1) {
				SetSlip (slipForwardFriction, slipSidewayFriction);
			} else {
				SetSlip (1, 1);
			}
		} else {
			wheelFR.brakeTorque = 0 ;
			wheelFL.brakeTorque = 0;
			SetSlip(myForwardFricTion, mySidewayFriction);
		}
	}

	function SetSlip( currentFordFriction : float, currentSidewayFriction : float){
		wheelRR.forwardFriction.stiffness = currentFordFriction;
		wheelRL.forwardFriction.stiffness = currentFordFriction;

		wheelRR.sidewaysFriction.stiffness = currentSidewayFriction;
		wheelRL.sidewaysFriction.stiffness = currentSidewayFriction;
	}

	function Control(){
		//Toc do
		currentSpeed = 2 * 22 / 7 * wheelRL.radius * wheelRL.rpm * 60/1000;
		currentSpeed = Mathf.Round (currentSpeed);

		//MomenXoan cho 2 banh sau
		if (currentSpeed < topSpeed && currentSpeed > -maxReverseSpeed && !braked) {
			wheelRR.motorTorque = maxTorque * Input.GetAxis ("Vertical");
			wheelRL.motorTorque = maxTorque * Input.GetAxis ("Vertical");
		} else {
			wheelRR.motorTorque = 0;
			wheelRL.motorTorque  =0;
		}

		//Giam toc
		if (Input.GetButton ("Vertical") == false) {
			wheelRR.brakeTorque = deceleratationSpeed;
			wheelRL.brakeTorque = deceleratationSpeed;
		} else {
			wheelRL.brakeTorque = 0;
			wheelRR.brakeTorque = 0;
		}

		var speedFactor = GetComponent(Rigidbody).velocity.magnitude/lowestSteerAtSpeed;

		//Goc quay lai hien tai
		var currentSteerAngle = Mathf.Lerp(lowSpeedSteerAngel, highSpeedSteerAngel, speedFactor);
		currentSteerAngle *= Input.GetAxis("Horizontal");

		//Goc quay lai
		wheelFR.steerAngle = currentSteerAngle;
		wheelFL.steerAngle = currentSteerAngle;
	}

	function Update(){
		if(Input.GetKeyDown(KeyCode.F)){
			spotLight.active = !spotLight.active;
		}
		
		wheelFLTrans.Rotate ( wheelFL.rpm / 60 * 360* Time.deltaTime, 0, 0);
		wheelFRTrans.Rotate ( wheelFL.rpm / 60 * 360* Time.deltaTime, 0, 0);
		wheelRLTrans.Rotate (wheelRL.rpm / 60 * 360* Time.deltaTime, 0 , 0);
		wheelRRTrans.Rotate (wheelRR.rpm / 60 * 360* Time.deltaTime, 0 , 0);

		wheelFLTrans.localEulerAngles.x = wheelFL.steerAngle - wheelFLTrans.localEulerAngles.x;
		wheelFRTrans.localEulerAngles.x = wheelFR.steerAngle - wheelFLTrans.localEulerAngles.x;
	}