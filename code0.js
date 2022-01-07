gdjs.GameCode = {};
gdjs.GameCode.GDBackgroundObjects1= [];
gdjs.GameCode.GDBackgroundObjects2= [];
gdjs.GameCode.GDBackgroundObjects3= [];
gdjs.GameCode.GDPlayerObjects1= [];
gdjs.GameCode.GDPlayerObjects2= [];
gdjs.GameCode.GDPlayerObjects3= [];
gdjs.GameCode.GDAsteroidObjects1= [];
gdjs.GameCode.GDAsteroidObjects2= [];
gdjs.GameCode.GDAsteroidObjects3= [];
gdjs.GameCode.GDBorderObjects1= [];
gdjs.GameCode.GDBorderObjects2= [];
gdjs.GameCode.GDBorderObjects3= [];
gdjs.GameCode.GDScoreObjects1= [];
gdjs.GameCode.GDScoreObjects2= [];
gdjs.GameCode.GDScoreObjects3= [];
gdjs.GameCode.GDBuffObjects1= [];
gdjs.GameCode.GDBuffObjects2= [];
gdjs.GameCode.GDBuffObjects3= [];

gdjs.GameCode.conditionTrue_0 = {val:false};
gdjs.GameCode.condition0IsTrue_0 = {val:false};
gdjs.GameCode.condition1IsTrue_0 = {val:false};
gdjs.GameCode.condition2IsTrue_0 = {val:false};
gdjs.GameCode.conditionTrue_1 = {val:false};
gdjs.GameCode.condition0IsTrue_1 = {val:false};
gdjs.GameCode.condition1IsTrue_1 = {val:false};
gdjs.GameCode.condition2IsTrue_1 = {val:false};


gdjs.GameCode.eventsList0 = function(runtimeScene) {

{


{
gdjs.copyArray(runtimeScene.getObjects("Border"), gdjs.GameCode.GDBorderObjects1);
{for(var i = 0, len = gdjs.GameCode.GDBorderObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDBorderObjects1[i].setOpacity(0);
}
}}

}


};gdjs.GameCode.eventsList1 = function(runtimeScene) {

{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.GameCode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.GameCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerObjects1[i].setY(gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - (gdjs.GameCode.GDPlayerObjects1[i].getHeight()) / 1.2);
}
}
{ //Subevents
gdjs.GameCode.eventsList0(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList2 = function(runtimeScene) {

{

/* Reuse gdjs.GameCode.GDBackgroundObjects1 */

gdjs.GameCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.GameCode.GDBackgroundObjects1.length;i<l;++i) {
    if ( gdjs.GameCode.GDBackgroundObjects1[i].getY() > gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) ) {
        gdjs.GameCode.condition0IsTrue_0.val = true;
        gdjs.GameCode.GDBackgroundObjects1[k] = gdjs.GameCode.GDBackgroundObjects1[i];
        ++k;
    }
}
gdjs.GameCode.GDBackgroundObjects1.length = k;}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDBackgroundObjects1 */
{for(var i = 0, len = gdjs.GameCode.GDBackgroundObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDBackgroundObjects1[i].setY(-(1900));
}
}}

}


};gdjs.GameCode.eventsList3 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.GameCode.GDAsteroidObjects1, gdjs.GameCode.GDAsteroidObjects2);


gdjs.GameCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.GameCode.GDAsteroidObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDAsteroidObjects2[i].getY() >= 2500 ) {
        gdjs.GameCode.condition0IsTrue_0.val = true;
        gdjs.GameCode.GDAsteroidObjects2[k] = gdjs.GameCode.GDAsteroidObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDAsteroidObjects2.length = k;}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDAsteroidObjects2 */
{for(var i = 0, len = gdjs.GameCode.GDAsteroidObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDAsteroidObjects2[i].deleteFromScene(runtimeScene);
}
}}

}


{


{
gdjs.copyArray(runtimeScene.getObjects("Score"), gdjs.GameCode.GDScoreObjects1);
{for(var i = 0, len = gdjs.GameCode.GDScoreObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDScoreObjects1[i].setX((gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2) - (gdjs.GameCode.GDScoreObjects1[i].getWidth()) / 2);
}
}}

}


};gdjs.GameCode.eventsList4 = function(runtimeScene) {

{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)) <= 0.015;
}if (gdjs.GameCode.condition0IsTrue_0.val) {
{runtimeScene.getGame().getVariables().getFromIndex(0).add(0.0015);
}{runtimeScene.getGame().getVariables().getFromIndex(2).add(0.015);
}}

}


};gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDPlayerObjects2Objects = Hashtable.newFrom({"Player": gdjs.GameCode.GDPlayerObjects2});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects2Objects = Hashtable.newFrom({"Asteroid": gdjs.GameCode.GDAsteroidObjects2});gdjs.GameCode.userFunc0x6b06b0 = function(runtimeScene) {
"use strict";
vkBridge.send("VKWebAppCheckNativeAds", {"ad_format": "interstitial"});

vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
.then(data => console.log(data.result))
.catch(error => console.log(error));

};
gdjs.GameCode.eventsList5 = function(runtimeScene) {

{


gdjs.GameCode.userFunc0x6b06b0(runtimeScene);

}


};gdjs.GameCode.eventsList6 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Asteroid"), gdjs.GameCode.GDAsteroidObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.GameCode.GDPlayerObjects2);

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDPlayerObjects2Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects2Objects, false, runtimeScene, false);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDPlayerObjects2 */
{for(var i = 0, len = gdjs.GameCode.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerObjects2[i].deleteFromScene(runtimeScene);
}
}
{ //Subevents
gdjs.GameCode.eventsList5(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.GameCode.GDPlayerObjects1);
{for(var i = 0, len = gdjs.GameCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerObjects1[i].setX(gdjs.evtTools.common.lerp((gdjs.GameCode.GDPlayerObjects1[i].getPointX("")), gdjs.evtTools.input.getMouseX(runtimeScene, "", 0), gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(2))));
}
}}

}


};gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects1Objects = Hashtable.newFrom({"Asteroid": gdjs.GameCode.GDAsteroidObjects1});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects1Objects = Hashtable.newFrom({"Asteroid": gdjs.GameCode.GDAsteroidObjects1});gdjs.GameCode.eventsList7 = function(runtimeScene) {

{


gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 2, "Asteroid");
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
{gdjs.GameCode.conditionTrue_1 = gdjs.GameCode.condition1IsTrue_0;
gdjs.GameCode.conditionTrue_1.val = runtimeScene.getOnceTriggers().triggerOnce(7812692);
}
}}
if (gdjs.GameCode.condition1IsTrue_0.val) {
gdjs.GameCode.GDAsteroidObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects1Objects, gdjs.randomInRange(70, 300), -(200), "");
}{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDAsteroidObjects1Objects, gdjs.randomInRange(480, 580), -(200), "");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Asteroid");
}}

}


};gdjs.GameCode.eventsList8 = function(runtimeScene) {

{


gdjs.GameCode.eventsList1(runtimeScene);
}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.common.logicalNegation(false);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("Background"), gdjs.GameCode.GDBackgroundObjects1);
{for(var i = 0, len = gdjs.GameCode.GDBackgroundObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDBackgroundObjects1[i].setY(gdjs.GameCode.GDBackgroundObjects1[i].getY() + (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)) * 1500));
}
}
{ //Subevents
gdjs.GameCode.eventsList2(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.common.logicalNegation(false);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("Asteroid"), gdjs.GameCode.GDAsteroidObjects1);
{for(var i = 0, len = gdjs.GameCode.GDAsteroidObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDAsteroidObjects1[i].rotate(45, runtimeScene);
}
}{for(var i = 0, len = gdjs.GameCode.GDAsteroidObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDAsteroidObjects1[i].setY(gdjs.evtTools.common.lerp((gdjs.GameCode.GDAsteroidObjects1[i].getPointY("")), 3000, gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0))));
}
}
{ //Subevents
gdjs.GameCode.eventsList3(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 0.4, "Score");
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
{gdjs.GameCode.conditionTrue_1 = gdjs.GameCode.condition1IsTrue_0;
gdjs.GameCode.conditionTrue_1.val = runtimeScene.getOnceTriggers().triggerOnce(7806860);
}
}}
if (gdjs.GameCode.condition1IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("Score"), gdjs.GameCode.GDScoreObjects1);
{runtimeScene.getGame().getVariables().getFromIndex(1).add(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(3)));
}{for(var i = 0, len = gdjs.GameCode.GDScoreObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDScoreObjects1[i].setString(gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(1))) + "км");
}
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Score");
}}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 7, "Difficult");
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
{gdjs.GameCode.conditionTrue_1 = gdjs.GameCode.condition1IsTrue_0;
gdjs.GameCode.conditionTrue_1.val = runtimeScene.getOnceTriggers().triggerOnce(7808748);
}
}}
if (gdjs.GameCode.condition1IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Difficult");
}{runtimeScene.getGame().getVariables().getFromIndex(3).setNumber(Math.round(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(3)) * 1.4));
}{gdjs.evtTools.debuggerTools.log(gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0))), "", "");
}
{ //Subevents
gdjs.GameCode.eventsList4(runtimeScene);} //End of subevents
}

}


{


gdjs.GameCode.eventsList6(runtimeScene);
}


{


gdjs.GameCode.eventsList7(runtimeScene);
}


};

gdjs.GameCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameCode.GDBackgroundObjects1.length = 0;
gdjs.GameCode.GDBackgroundObjects2.length = 0;
gdjs.GameCode.GDBackgroundObjects3.length = 0;
gdjs.GameCode.GDPlayerObjects1.length = 0;
gdjs.GameCode.GDPlayerObjects2.length = 0;
gdjs.GameCode.GDPlayerObjects3.length = 0;
gdjs.GameCode.GDAsteroidObjects1.length = 0;
gdjs.GameCode.GDAsteroidObjects2.length = 0;
gdjs.GameCode.GDAsteroidObjects3.length = 0;
gdjs.GameCode.GDBorderObjects1.length = 0;
gdjs.GameCode.GDBorderObjects2.length = 0;
gdjs.GameCode.GDBorderObjects3.length = 0;
gdjs.GameCode.GDScoreObjects1.length = 0;
gdjs.GameCode.GDScoreObjects2.length = 0;
gdjs.GameCode.GDScoreObjects3.length = 0;
gdjs.GameCode.GDBuffObjects1.length = 0;
gdjs.GameCode.GDBuffObjects2.length = 0;
gdjs.GameCode.GDBuffObjects3.length = 0;

gdjs.GameCode.eventsList8(runtimeScene);
return;

}

gdjs['GameCode'] = gdjs.GameCode;
