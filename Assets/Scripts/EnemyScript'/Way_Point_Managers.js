var lastPos:Vector3;

function OnDrawGizmos(){

	
	var wayPoints = gameObject.GetComponentInChildren(Transform);

	for (var wayPoint:Transform in wayPoints)
	{
		
		Gizmos.DrawSphere (wayPoint.position,5);
		Gizmos.color = Color.yellow;
		Gizmos.DrawLine(wayPoint.position, lastPos);
		lastPos = wayPoint.position;
	}
}