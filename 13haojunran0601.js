// 自执行函数
var switcher = (function(){
    // 返回一个对象
    return {
        // 对象中有一个init方法
        // 方法中传入的参数是canvas标签
        init(target){
                let c = document.querySelector(target);
                let ctx = c.getContext("2d");
                let x1 = 10;
                let y1 = 10;
                let x2 = 30;
                let y2 = 10; 
                let r = 10;
                var i = 1;
                let colorOn = c.getAttribute("on");
                let colorOff = c.getAttribute("off");
            
                function bg(a){
                    // 两个圆和一个正方形
                    ctx.beginPath();
                    if (a){
                        ctx.fillStyle = colorOn;
                    }else{
                        ctx.fillStyle = colorOff;
                    }
                    ctx.arc(x1,y1,r,0,Math.PI*2);
                    ctx.arc(x2,y2,r,0,Math.PI*2);
                    ctx.fillRect(x1,0,2*r,2*r);
                    ctx.fill(); 
                }
                bg(true);    
            
                function whiteC(circle_x){
                    // 白色圆点
                    ctx.beginPath();
                    ctx.arc(circle_x,y2,r-2,0,Math.PI*2);
                    ctx.fillStyle = "white";
                    ctx.fill();     
                }
                whiteC(x2);
                
            
            
            
                // 点击事件
            c.onclick = function(){
                    ctx.clearRect(0, 0, 4*r, 4*r);
                    if(i % 2 != 0 ){ 
                        var circle_x = x2; 
                        var handle1 = setInterval(function(){
                            ctx.clearRect(0, 0, 4*r, 4*r);
                            bg(false);                
                            whiteC(circle_x--);
                            if(circle_x == x1){
                                clearInterval(handle1);
                            }                             
                        },10);
                        c.setAttribute("status","off");
                    }else{
                        var circle_x = x1;
                        var handle2 = setInterval(function(){
                            ctx.clearRect(0, 0, 4*r, 4*r);
                            bg(true);                
                            whiteC(circle_x++);
                            if(circle_x == x2){
                                clearInterval(handle2);
                            }
                        },10);           
                        c.setAttribute("status","on");
                    }
                    i++;
            };
            }
        }

})();
