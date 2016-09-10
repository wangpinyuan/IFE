// A*寻路算法
// 把起始格添加到 "开启列表" 
// do 
// { 
//        寻找开启列表中F值最低的格子, 我们称它为当前格. 
//        把它切换到关闭列表. 
//        对当前格相邻的4格中的每一个 
//           if (它不可通过 || 已经在 "关闭列表" 中) 
//           { 
//                 什么也不做. 
//            } 
//           if (它不在开启列表中) 
//           { 
//                 把它添加进 "开启列表", 把当前格作为这一格的父节点, 计算这一格的 FGH 
//           if (它已经在开启列表中) 
//           { 
//                 if (用G值为参考检查新的路径是否更好, 更低的G值意味着更好的路径) 
//                     { 
//                             把这一格的父节点改成当前格, 并且重新计算这一格的 GF 值. 
//                     } 
// } while( 目标格已经在 "开启列表", 这时候路径被找到) 
// 
// 如果开启列表已经空了, 说明路径不存在.
// 
// 最后从目标格开始, 沿着每一格的父节点移动直到回到起始格, 这就是路径.

// 
// searchRoad(1,1,8,8);

// 
function searchRoad(startX,startY,endX,endY){
	var openList = [];
	var closeList = [];
	var result = [];
	var resultIndex;

	openList.push({x:startX,y:startY,g:0});//初始节点 放入openList

	while(!(resultIndex = existList({x:endX,y:endY},openList))){ // 终点未出现

		var currentPoint = openList.pop();// 获取当前格
		closeList.push(currentPoint);     // 当前格放入关闭列表

		var Surroundpoint = SurroundPoint(currentPoint); // 获取周围格子

		for (var i in Surroundpoint) {

			var item = Surroundpoint[i];  	// 遍历周围格子
			// 是否不可通过 或者 在关闭列表中 
			// 如果是 	跳过此节点
			// 不是 	即为可操作节点
			if(1<=item.x&&item.x<=10&&1<=item.y&&item.y<=10){ //判断格子是否存在

				var cell = document.getElementById("row"+item.y+"-"+"col"+item.x); // 地图上对应的格子

				if (cell.className != "build" && !existList(item,closeList)) {	 // 判断格子是否可通过

					var g = 1;                			//g的初始值

					if (!existList(item,openList)) {	//不在开始列表 则加入开始列表

						item.H = Math.abs(item.x - endX) + Math.abs(item.y - endY);
						item.G = g;
						item.F = item.H + item.G;   	// 求得F=G+H
						item.parent = currentPoint;		
						openList.push(item);			// 加入开始列表
						// console.log(item)

					}else{								// 已在开始列表 重新计算路径

						var index = existList(item,openList); //开始列表中获取他
						if(g < openList[index]){		// 若新的的G小
														// 把他的 父方格改为当前选中的
														// 否则什么都不做
							openList[index].parent = currentPoint;
							openList[index].G = g;
							openList[index].F = g + openList[index].H;
						}
					}
				}
			}
		}
		if (openList == 0) { // 找不到路
			break;			//	结束循环
		}
		openList.sort(sortF);	// 重新排序 开始列表 
								// 倒序排列 下次循环取出F最小的
	}
	// 循环结束
	if (!resultIndex) {  // 如果没值
		result = [];
	}else{
		var currentObj = openList[resultIndex]; // currentObj 为目标点
		while(currentObj.x != startX || currentObj.y != startY){
			// 从目标点依次返回  直到值为开始点
			result.unshift({x:currentObj.x,y:currentObj.y,go:currentObj.go}); // 将每个点的 x,y 倒序插入result
			currentObj = currentObj.parent;					//	返回上一个节点 进入下一次循环
		}
	}
	return result;
}
// 判断 点 是否在 列表中
// 若存在 返回index
// 不存在 返回false
function existList(point,list){
	for (var i in list) {
		if (point.x == list[i].x && point.y == list[i].y ) {
			return i;
		}
	}
	return false;
}

function SurroundPoint(currentPoint){
	var x = currentPoint.x;
	var y = currentPoint.y;

	return [
			{x:x-1,y:y,go:"moveleft"},//左
			{x:x,y:y-1,go:"moveup"},//上
			{x:x+1,y:y,go:"moveright"},//右
			{x:x,y:y+1,go:"movedown"} //下
			]
}

function sortF(a,b){
	return b.F - a.F;
}