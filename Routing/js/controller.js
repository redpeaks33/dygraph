﻿var main = angular.module("app", ['chart.js']);

main.controller('MyController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.Message = 'Click Button';
    $scope.charts = [];

    $scope.initialize = function()
    {
        
        //$scope.tabClicked('dygraph');
        setChart();
    }
    var setChart = function()
    {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
        $scope.options = {
            animation: {
                duration: 500,
                easing: "easeOutQuart",
                onComplete: function () {
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset) {

                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                                mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                                start_angle = model.startAngle,
                                end_angle = model.endAngle,
                                mid_angle = start_angle + (end_angle - start_angle) / 2;

                            var x = mid_radius * Math.cos(mid_angle);
                            var y = mid_radius * Math.sin(mid_angle);

                            ctx.fillStyle = '#fff';
                            if (i == 3) { // Darker text color for lighter background
                                ctx.fillStyle = '#444';
                            }
                            var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
                            ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                            // Display percent in another line, line break doesn't work for fillText
                            ctx.fillText(percent, model.x + x, model.y + y + 15);
                        }
                    });
                }
            }
        };
    }
    $scope.tabClicked = function(type)
    {
        $scope.stage = new createjs.Stage('canvas_id');
        initializeData();
        createjs.Ticker.addEventListener("tick", $scope.stage);
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;




        //createjs.Ticker.addEventListener("tick", handleTick(stage));
        //stage.update();


        //// 円を作成します
        //$scope.shape = new createjs.Shape();
        //$scope.shape.graphics.beginFill("DarkRed").drawCircle(0, 0, 100); //半径100pxの円を描画
        //$scope.shape.y = 150; // Y座標300の位置に配置
        //stage.addChild($scope.shape); // 表示リストに追加



    }

    //function handleTick() {
    //    // アニメーション
    //    $scope.shape.x += 2;
    //}
    var initializeData = function () {
        var limit = 20000;    //increase number of dataPoints by increasing this
        var y = 0;
        $scope.dataPoints = [];
        for (var i = 0; i < limit/2; i++) {
            $scope.dataPoints.push({
                x: i,
                y: i*i/1000 
            });
        }
        for (var i = limit / 2; i < limit; i++) {
            $scope.dataPoints.push({
                x: i,
                y: i * i / 100
            });
        }



        //for(var i = 0;i< $scope.dataPoints.length;i++) {
        //    var shape = new createjs.Shape();
        //    shape.graphics.beginFill("Blue");
        //    shape.graphics.drawCircle($scope.dataPoints[i].x, $scope.dataPoints[i].y, 1);
        //    stage.addChild(shape);
        //    if (i != 0)
        //    {
        //        var g = new createjs.Graphics();
        //        g.beginStroke("Red");
        //        g.moveTo($scope.dataPoints[i - 1].x, $scope.dataPoints[i - 1].y);
        //        g.lineTo($scope.dataPoints[i].x, $scope.dataPoints[i].y);
        //        var s = new createjs.Shape(g);
        //        stage.addChild(s);
        //    }
            
        //};

    }

    var index = 0;
    var handleTick = function() {
        // アニメーション
        //shape.x += 2;

        var shape = new createjs.Shape();
        shape.graphics.beginFill("Blue");
        shape.graphics.drawCircle($scope.dataPoints[index].x, $scope.dataPoints[index].y, 1);
        $scope.stage.addChild(shape);
        if (index != 0) {
            var g = new createjs.Graphics();
            g.beginStroke("Red");
            g.moveTo($scope.dataPoints[index - 1].x, $scope.dataPoints[index - 1].y);
            g.lineTo($scope.dataPoints[index].x, $scope.dataPoints[index].y);
            var s = new createjs.Shape(g);
            $scope.stage.addChild(s);
        }
        index++;

        // Stageの描画を更新します
        //stage.update();
    }
 
}]);
