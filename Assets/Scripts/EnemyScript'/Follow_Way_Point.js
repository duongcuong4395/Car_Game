var spawnPoints: Transform;
private var wayPoint = new Array();
private var mesate:float;
private var sayac: int = 0;
public var enemy_Speed: float = 15;

function Start(){
	var i = 0;
	for (var child:Transform in spawnPoints){
		wayPoint[i] = child;
		i++;
	}
}


function Update () {
	mesafe = Vector3.Distance(transform.position, wayPoint[sayac].position);

	//transform.LookAt(wayPoint[sayac].position);
	var relativePos = wayPoint[sayac].position - transform.position;
	var rotation = Quaternion.LookRotation(relativePos);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * 4 );

	transform.Translate(Vector3.forward	* Time.deltaTime * enemy_Speed);

	if (mesafe <= 12){
		sayac++;
	}

	if (sayac >= wayPoint.length) {
		sayac = 0;
	}

}