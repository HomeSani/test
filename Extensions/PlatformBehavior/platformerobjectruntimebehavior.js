var gdjs;(function(n){const m=class extends n.RuntimeBehavior{constructor(e,t,i){super(e,t,i);this._ignoreTouchingEdges=!0;this._currentFallSpeed=0;this._currentSpeed=0;this._canJump=!1;this._leftKey=!1;this._rightKey=!1;this._ladderKey=!1;this._upKey=!1;this._downKey=!1;this._jumpKey=!1;this._releasePlatformKey=!1;this._releaseLadderKey=!1;this._hasReallyMoved=!1;this._slopeClimbingFactor=1;this._requestedDeltaX=0;this._requestedDeltaY=0;this._lastDeltaY=0;this._gravity=t.gravity,this._maxFallingSpeed=t.maxFallingSpeed,this._ladderClimbingSpeed=t.ladderClimbingSpeed||150,this._acceleration=t.acceleration,this._deceleration=t.deceleration,this._maxSpeed=t.maxSpeed,this._jumpSpeed=t.jumpSpeed,this._canGrabPlatforms=t.canGrabPlatforms||!1,this._yGrabOffset=t.yGrabOffset||0,this._xGrabTolerance=t.xGrabTolerance||10,this._jumpSustainTime=t.jumpSustainTime||0,this._ignoreDefaultControls=t.ignoreDefaultControls,this._potentialCollidingObjects=[],this._overlappedJumpThru=[],this._slopeMaxAngle=0,this.setSlopeMaxAngle(t.slopeMaxAngle),this._manager=n.PlatformObjectsManager.getManager(e),this._falling=new S(this),this._onFloor=new P(this),this._jumping=new M(this),this._grabbingPlatform=new Y(this),this._onLadder=new y(this),this._state=this._falling}updateFromBehaviorData(e,t){return e.gravity!==t.gravity&&this.setGravity(t.gravity),e.maxFallingSpeed!==t.maxFallingSpeed&&this.setMaxFallingSpeed(t.maxFallingSpeed),e.acceleration!==t.acceleration&&this.setAcceleration(t.acceleration),e.deceleration!==t.deceleration&&this.setDeceleration(t.deceleration),e.maxSpeed!==t.maxSpeed&&this.setMaxSpeed(t.maxSpeed),e.jumpSpeed!==t.jumpSpeed&&this.setJumpSpeed(t.jumpSpeed),e.canGrabPlatforms!==t.canGrabPlatforms&&this.setCanGrabPlatforms(t.canGrabPlatforms),e.yGrabOffset!==t.yGrabOffset&&(this._yGrabOffset=t.yGrabOffset),e.xGrabTolerance!==t.xGrabTolerance&&(this._xGrabTolerance=t.xGrabTolerance),e.jumpSustainTime!==t.jumpSustainTime&&this.setJumpSustainTime(t.jumpSustainTime),!0}doStepPreEvents(e){const t=37,i=38,o=39,r=40,a=1016,s=2016,_=32,l=this.owner,f=this.owner.getElapsedTime(e)/1e3;this._requestedDeltaX=0,this._requestedDeltaY=0;const h=e.getGame().getInputManager();this._leftKey||(this._leftKey=!this._ignoreDefaultControls&&h.isKeyPressed(t)),this._rightKey||(this._rightKey=!this._ignoreDefaultControls&&h.isKeyPressed(o)),this._jumpKey||(this._jumpKey=!this._ignoreDefaultControls&&(h.isKeyPressed(a)||h.isKeyPressed(s)||h.isKeyPressed(_))),this._ladderKey||(this._ladderKey=!this._ignoreDefaultControls&&h.isKeyPressed(i)),this._upKey||(this._upKey=!this._ignoreDefaultControls&&h.isKeyPressed(i)),this._downKey||(this._downKey=!this._ignoreDefaultControls&&h.isKeyPressed(r)),this._releasePlatformKey||(this._releasePlatformKey=!this._ignoreDefaultControls&&h.isKeyPressed(r)),this._requestedDeltaX+=this._updateSpeed(f),this._state.beforeUpdatingObstacles(f),this._onFloor._oldHeight=l.getHeight(),this._updatePotentialCollidingObjects(Math.max(this._requestedDeltaX,this._maxFallingSpeed*f)),this._updateOverlappedJumpThru(),this._state.checkTransitionBeforeX(),this._state.beforeMovingX(),this._separateFromPlatforms(this._potentialCollidingObjects,!0)&&(this._canJump=!0);const d=l.getX();this._moveX(),this._state.checkTransitionBeforeY(f),this._state.beforeMovingY(f,d);const u=l.getY();this._moveY(),this._state!==this._onLadder&&this._checkTransitionOnFloorOrFalling(),this._leftKey=!1,this._rightKey=!1,this._ladderKey=!1,this._releaseLadderKey=!1,this._upKey=!1,this._downKey=!1,this._releasePlatformKey=!1,this._jumpKey=!1,this._hasReallyMoved=Math.abs(l.getX()-d)>=1||Math.abs(l.getY()-u)>=1,this._lastDeltaY=l.getY()-u}doStepPostEvents(e){}_updateSpeed(e){if(this._leftKey&&(this._currentSpeed-=this._acceleration*e),this._rightKey&&(this._currentSpeed+=this._acceleration*e),this._leftKey===this._rightKey){const t=this._currentSpeed>0;this._currentSpeed-=this._deceleration*e*(t?1:-1),t&&this._currentSpeed<0&&(this._currentSpeed=0),!t&&this._currentSpeed>0&&(this._currentSpeed=0)}return this._currentSpeed>this._maxSpeed&&(this._currentSpeed=this._maxSpeed),this._currentSpeed<-this._maxSpeed&&(this._currentSpeed=-this._maxSpeed),this._currentSpeed*e}_moveX(){const e=this.owner,t=e.getX();if(this._requestedDeltaX!==0){let i=this._onFloor.getFloorPlatform()!==null?this._onFloor.getFloorPlatform().owner.id:null;e.setX(e.getX()+this._requestedDeltaX);let o=!0;for(;this._isCollidingWithOneOf(this._potentialCollidingObjects,i,!0);){if(this._requestedDeltaX>0&&e.getX()<=t||this._requestedDeltaX<0&&e.getX()>=t){e.setX(t);break}o?(e.setX(Math.round(e.getX())),o=!1):e.setX(Math.round(e.getX())+(this._requestedDeltaX>0?-1:1))}this._state!==this._onFloor&&e.getX()!==t+this._requestedDeltaX&&(this._currentSpeed=0)}}_moveY(){const e=this.owner;if(this._requestedDeltaY!==0)if(this._requestedDeltaY>0){const{highestGround:t}=this._findHighestFloorAndMoveOnTop(this._potentialCollidingObjects,0,this._requestedDeltaY);t||e.setY(e.getY()+this._requestedDeltaY)}else{let t=e.getY();for(e.setY(e.getY()+this._requestedDeltaY);this._requestedDeltaY<0&&this._isCollidingWithOneOf(this._potentialCollidingObjects,null,!0)||this._requestedDeltaY>0&&this._isCollidingWithOneOfExcluding(this._potentialCollidingObjects,this._overlappedJumpThru);){if(this._state===this._jumping&&this._setFalling(),this._requestedDeltaY>0&&e.getY()<=t||this._requestedDeltaY<0&&e.getY()>=t){e.setY(t);break}e.setY(Math.floor(e.getY())+(this._requestedDeltaY>0?-1:1))}}}_setFalling(){this._state.leave(),this._state=this._falling,this._falling.enter()}_setOnFloor(e){this._state.leave(),this._state=this._onFloor,this._onFloor.enter(e)}_setJumping(){this._state.leave();const e=this._state;this._state=this._jumping,this._jumping.enter(e)}_setGrabbingPlatform(e){this._state.leave(),this._state=this._grabbingPlatform,this._grabbingPlatform.enter(e)}_setOnLadder(){this._state.leave(),this._state=this._onLadder,this._onLadder.enter()}_checkTransitionOnLadder(){this._ladderKey&&this._isOverlappingLadder()&&this._setOnLadder()}_checkTransitionJumping(){this._canJump&&this._jumpKey&&this._setJumping()}_checkGrabPlatform(){const e=this.owner;let t=e.getX();e.setX(e.getX()+(this._requestedDeltaX>0?this._xGrabTolerance:-this._xGrabTolerance));const i=n.staticArray(m.prototype._checkGrabPlatform);i.length=0;for(const r of this._potentialCollidingObjects)this._isCollidingWith(r)&&this._canGrab(r)&&i.push(r);e.setX(t);let o=e.getY();for(const r of i){if(e.setY(r.owner.getY()+r.getYGrabOffset()-this._yGrabOffset),!this._isCollidingWithOneOf(this._potentialCollidingObjects,null,!0)){this._setGrabbingPlatform(r),this._requestedDeltaY=0,i.length=0;return}e.setY(o)}i.length=0}_checkTransitionOnFloorOrFalling(){const e=this.owner,t=e.getY(),i=this._requestedDeltaY>=0,{highestGround:o}=this._findHighestFloorAndMoveOnTop(this._potentialCollidingObjects,-1,1);this._state===this._onFloor?o?o===this._onFloor.getFloorPlatform()?this._onFloor.updateFloorPosition():this._setOnFloor(o):this._setFalling():o&&i?this._setOnFloor(o):e.setY(t)}_fall(e){this._currentFallSpeed+=this._gravity*e,this._currentFallSpeed>this._maxFallingSpeed&&(this._currentFallSpeed=this._maxFallingSpeed),this._requestedDeltaY+=this._currentFallSpeed*e,this._requestedDeltaY=Math.min(this._requestedDeltaY,this._maxFallingSpeed*e)}_canGrab(e){const t=this.owner.getY()+this._yGrabOffset-this._lastDeltaY,i=this.owner.getY()+this._yGrabOffset,o=e.owner.getY()+e.getYGrabOffset();return e.canBeGrabbed()&&(t<o&&o<i||i<o&&o<t)}_releaseGrabbedPlatform(){this._state===this._grabbingPlatform&&this._setFalling()}_releaseLadder(){this._state===this._onLadder&&this._setFalling()}_separateFromPlatforms(e,t){t=!!t;const i=n.staticArray(m.prototype._separateFromPlatforms);i.length=0;for(let o=0;o<e.length;++o){const r=e[o];r.getPlatformType()!==n.PlatformRuntimeBehavior.LADDER&&(t&&r.getPlatformType()===n.PlatformRuntimeBehavior.JUMPTHRU||i.push(r.owner))}return this.owner.separateFromObjects(i,this._ignoreTouchingEdges)}_isCollidingWithOneOf(e,t,i){i=!!i;for(let o=0;o<e.length;++o){const r=e[o];if(r.owner.id!==t&&r.getPlatformType()!==n.PlatformRuntimeBehavior.LADDER&&!(i&&r.getPlatformType()===n.PlatformRuntimeBehavior.JUMPTHRU)&&n.RuntimeObject.collisionTest(this.owner,r.owner,this._ignoreTouchingEdges))return!0}return!1}_findHighestFloorAndMoveOnTop(e,t,i){const o=c.instance;o.initializeBeforeSearch(this,t,i);let r=Number.MAX_VALUE,a=null,s=!1;for(const l of e){if(l.getPlatformType()===n.PlatformRuntimeBehavior.LADDER||l.getPlatformType()===n.PlatformRuntimeBehavior.JUMPTHRU&&(this._state===this._onFloor&&l!==this._onFloor.getFloorPlatform()&&i<0||this._state!==this._onFloor&&this._isIn(this._overlappedJumpThru,l.owner.id)))continue;const f=o.allowedMinDeltaY,h=o.allowedMaxDeltaY;this._findPlatformHighestRelativeYUnderObject(l,o);let d=o.getFloorDeltaY();if(this._state===this._onFloor&&l!==this._onFloor.getFloorPlatform()&&l.getPlatformType()===n.PlatformRuntimeBehavior.JUMPTHRU&&d<0){o.revertTo(f,h);continue}if(o.isCollidingAnyPlatform()&&(s=!0),o.floorIsTooHigh()){a=null;break}o.isCollidingAnyPlatform()&&d<r&&(r=d,a=l)}if(a){const l=this.owner;l.setY(l.getY()+r)}const _=n.PlatformerObjectRuntimeBehavior._platformSearchResult;return _.highestGround=a,_.isCollidingAnyPlatform=s,_}_findPlatformHighestRelativeYUnderObject(e,t){const i=e.owner,o=i.getAABB();if(o.max[0]<=t.ownerMinX||o.min[0]>=t.ownerMaxX||o.max[1]<=t.headMinY||o.min[1]>t.floorMaxY)return t;for(const r of i.getHitBoxesAround(t.ownerMinX,t.headMinY,t.ownerMaxX,t.floorMaxY)){if(r.vertices.length<3)continue;t.initializeBeforeHitboxCheck();let a=r.vertices[r.vertices.length-2],s=r.vertices[r.vertices.length-1];for(const _ of r.vertices){(t.ownerMinX<s[0]&&s[0]<t.ownerMaxX||s[0]===t.ownerMinX&&(a[0]>s[0]||_[0]>s[0])||s[0]===t.ownerMaxX&&(a[0]<s[0]||_[0]<s[0]))&&t.addPointConstraint(s[1]);const l=s[0]-a[0];if(l!==0){if(s[0]<t.ownerMinX&&t.ownerMinX<a[0]||a[0]<t.ownerMinX&&t.ownerMinX<s[0]){const f=s[1]-a[1],h=a[1]+(t.ownerMinX-a[0])*f/l;t.addPointConstraint(h)}if(s[0]<t.ownerMaxX&&t.ownerMaxX<a[0]||a[0]<t.ownerMaxX&&t.ownerMaxX<s[0]){const f=s[1]-a[1],h=a[1]+(t.ownerMaxX-a[0])*f/l;t.addPointConstraint(h)}}if(t.floorIsTooHigh())return t;a=s,s=_}}return t}_isCollidingWithOneOfExcluding(e,t){for(let i=0;i<e.length;++i){const o=e[i];if(!(t&&this._isIn(t,o.owner.id))&&o.getPlatformType()!==n.PlatformRuntimeBehavior.LADDER&&n.RuntimeObject.collisionTest(this.owner,o.owner,this._ignoreTouchingEdges))return!0}return!1}_isCollidingWith(e){return e.getPlatformType()!==n.PlatformRuntimeBehavior.LADDER&&!this._isIn(this._overlappedJumpThru,e.owner.id)&&n.RuntimeObject.collisionTest(this.owner,e.owner,this._ignoreTouchingEdges)}_updateOverlappedJumpThru(){this._overlappedJumpThru.length=0;for(let e=0;e<this._potentialCollidingObjects.length;++e){const t=this._potentialCollidingObjects[e];t.getPlatformType()===n.PlatformRuntimeBehavior.JUMPTHRU&&n.RuntimeObject.collisionTest(this.owner,t.owner,this._ignoreTouchingEdges)&&this._overlappedJumpThru.push(t)}}_isOverlappingLadder(){for(let e=0;e<this._potentialCollidingObjects.length;++e){const t=this._potentialCollidingObjects[e];if(t.getPlatformType()===n.PlatformRuntimeBehavior.LADDER&&n.RuntimeObject.collisionTest(this.owner,t.owner,this._ignoreTouchingEdges))return!0}return!1}_isIn(e,t){for(let i=0;i<e.length;++i)if(e[i].owner.id===t)return!0;return!1}_updatePotentialCollidingObjects(e){this._manager.getAllPlatformsAround(this.owner,e,this._potentialCollidingObjects);for(let t=0;t<this._potentialCollidingObjects.length;)this._potentialCollidingObjects[t].owner===this.owner?this._potentialCollidingObjects.splice(t,1):t++}simulateControl(e){e==="Left"?this._leftKey=!0:e==="Right"?this._rightKey=!0:e==="Up"?this._upKey=!0:e==="Down"?this._downKey=!0:e==="Ladder"?this._ladderKey=!0:e==="Jump"?this._jumpKey=!0:e==="Release"?this._releasePlatformKey=!0:e==="Release Ladder"&&(this._releaseLadderKey=!0)}getGravity(){return this._gravity}getMaxFallingSpeed(){return this._maxFallingSpeed}getLadderClimbingSpeed(){return this._ladderClimbingSpeed}getAcceleration(){return this._acceleration}getDeceleration(){return this._deceleration}getMaxSpeed(){return this._maxSpeed}getJumpSpeed(){return this._jumpSpeed}getJumpSustainTime(){return this._jumpSustainTime}getCurrentFallSpeed(){return this._currentFallSpeed}getCurrentSpeed(){return this._currentSpeed}getCurrentJumpSpeed(){return this._jumping.getCurrentJumpSpeed()}canGrabPlatforms(){return this._canGrabPlatforms}canJump(){return this._canJump}setGravity(e){this._gravity=e}setMaxFallingSpeed(e){this._maxFallingSpeed=e}setLadderClimbingSpeed(e){this._ladderClimbingSpeed=e}setAcceleration(e){this._acceleration=e}setDeceleration(e){this._deceleration=e}setMaxSpeed(e){this._maxSpeed=e}setJumpSpeed(e){this._jumpSpeed=e}setJumpSustainTime(e){this._jumpSustainTime=e}setSlopeMaxAngle(e){e<0||e>=90||(this._slopeMaxAngle=e,e===45?this._slopeClimbingFactor=1:this._slopeClimbingFactor=Math.tan(e*3.1415926/180),this._slopeClimbingFactor<1/1024&&(this._slopeClimbingFactor=1/1024))}setCanJump(){this._canJump=!0}setCanNotAirJump(){(this._state===this._jumping||this._state===this._falling)&&(this._canJump=!1)}setCanGrabPlatforms(e){this._canGrabPlatforms=e,this._canGrabPlatforms||this._releaseGrabbedPlatform()}ignoreDefaultControls(e){this._ignoreDefaultControls=e}simulateLeftKey(){this._leftKey=!0}simulateRightKey(){this._rightKey=!0}simulateLadderKey(){this._ladderKey=!0}simulateReleaseLadderKey(){this._releaseLadderKey=!0}simulateUpKey(){this._upKey=!0}simulateDownKey(){this._downKey=!0}simulateJumpKey(){this._jumpKey=!0}simulateReleasePlatformKey(){this._releasePlatformKey=!0}isOnFloor(){return this._state===this._onFloor}isOnFloorObject(e){if(this.isOnFloor()){const t=this._onFloor.getFloorPlatform();return!!t&&t.owner.id===e.id}return!1}isOnLadder(){return this._state===this._onLadder}isJumping(){return this._state===this._jumping}isGrabbingPlatform(){return this._state===this._grabbingPlatform}isFallingWithoutJumping(){return this._state===this._falling}isFalling(){return this._state===this._falling||this._state===this._jumping&&this._currentFallSpeed>this._jumping.getCurrentJumpSpeed()}isMoving(){return this._hasReallyMoved&&(this._currentSpeed!==0||this._state===this._onLadder)||this._jumping.getCurrentJumpSpeed()!==0||this._currentFallSpeed!==0}};let b=m;b._platformSearchResult={highestGround:null,isCollidingAnyPlatform:!1},n.PlatformerObjectRuntimeBehavior=b;class P{constructor(e){this._floorPlatform=null;this._floorLastX=0;this._floorLastY=0;this._oldHeight=0;this._behavior=e}getFloorPlatform(){return this._floorPlatform}enter(e){this._floorPlatform=e,this.updateFloorPosition(),this._behavior._canJump=!0,this._behavior._currentFallSpeed=0}leave(){this._floorPlatform=null}updateFloorPosition(){this._floorLastX=this._floorPlatform.owner.getX(),this._floorLastY=this._floorPlatform.owner.getY()}beforeUpdatingObstacles(e){const t=this._behavior.owner;this._oldHeight!==t.getHeight()&&t.setY(this._floorLastY-t.getHeight()+(t.getY()-t.getDrawableY()));const i=this._floorPlatform.owner.getY()-this._floorLastY;i!==0&&Math.abs(i)<=Math.abs(this._behavior._maxFallingSpeed*e)&&t.setY(t.getY()+i)}checkTransitionBeforeX(){const e=this._behavior;e._isIn(e._potentialCollidingObjects,this._floorPlatform.owner.id)||e._setFalling()}beforeMovingX(){const e=this._behavior;e._requestedDeltaX+=this._floorPlatform.owner.getX()-this._floorLastX}checkTransitionBeforeY(e){const t=this._behavior;t._checkTransitionOnLadder(),t._checkTransitionJumping()}beforeMovingY(e,t){const i=this._behavior,o=i.owner;if(o.getX()===t+i._requestedDeltaX){const r=Math.abs(i._requestedDeltaX*i._slopeClimbingFactor),{highestGround:a,isCollidingAnyPlatform:s}=i._findHighestFloorAndMoveOnTop(i._potentialCollidingObjects,-r,r);a&&a!==this._floorPlatform&&i._setOnFloor(a),a===null&&s&&i.owner.setX(t)}else{const{highestGround:r,isCollidingAnyPlatform:a}=i._findHighestFloorAndMoveOnTop(i._potentialCollidingObjects,Math.min(0,-Math.abs(o.getX()-t)*i._slopeClimbingFactor),0);if(r===null&&a)i.owner.setX(t);else{const s=i._requestedDeltaX,_=s-(o.getX()-t),l=o.getY(),f=o.getX();o.setX(o.getX()+Math.sign(s));const{highestGround:h}=i._findHighestFloorAndMoveOnTop(i._potentialCollidingObjects,Math.min(-1,-1*i._slopeClimbingFactor),0);if(h){const d=Math.sign(s)*Math.max(1,Math.abs(_)-1);o.setX(o.getX()+d);const{highestGround:u}=i._findHighestFloorAndMoveOnTop(i._potentialCollidingObjects,-Math.abs(d)*i._slopeClimbingFactor,0);if(u)if(Math.abs(_)>=2)i._setOnFloor(u);else{o.setPosition(t+s,l);const{highestGround:v}=i._findHighestFloorAndMoveOnTop(i._potentialCollidingObjects,Math.min(-1,-Math.abs(_)*i._slopeClimbingFactor),0);v&&i._setOnFloor(v)}else Math.sign(f-t)===Math.sign(s)?o.setPosition(f,l):o.setPosition(t,l),i._currentSpeed=0}else Math.sign(f-t)===Math.sign(s)?o.setPosition(f,l):o.setPosition(t,l),i._currentSpeed=0}}}toString(){return"OnFloor"}}class S{constructor(e){this._behavior=e}enter(){this._behavior._canJump=!1}leave(){}beforeUpdatingObstacles(e){}checkTransitionBeforeX(){}beforeMovingX(){}checkTransitionBeforeY(e){const t=this._behavior;t._checkTransitionOnLadder(),t._checkTransitionJumping(),t._canGrabPlatforms&&t._requestedDeltaX!==0&&t._checkGrabPlatform()}beforeMovingY(e,t){this._behavior._fall(e)}toString(){return"Falling"}}class M{constructor(e){this._currentJumpSpeed=0;this._timeSinceCurrentJumpStart=0;this._jumpKeyHeldSinceJumpStart=!1;this._jumpingFirstDelta=!1;this._behavior=e}getCurrentJumpSpeed(){return this._currentJumpSpeed}enter(e){const t=this._behavior;this._timeSinceCurrentJumpStart=0,this._jumpKeyHeldSinceJumpStart=!0,e!==t._jumping&&e!==t._falling&&(this._jumpingFirstDelta=!0),t._canJump=!1,this._currentJumpSpeed=t._jumpSpeed,t._currentFallSpeed=0}leave(){this._currentJumpSpeed=0}beforeUpdatingObstacles(e){}checkTransitionBeforeX(){}beforeMovingX(){}checkTransitionBeforeY(e){const t=this._behavior;t._checkTransitionOnLadder(),t._checkTransitionJumping(),t._canGrabPlatforms&&t._requestedDeltaX!==0&&t._lastDeltaY>=0&&t._checkGrabPlatform()}beforeMovingY(e,t){const i=this._behavior;this._jumpingFirstDelta||i._fall(e),this._jumpingFirstDelta=!1,i._jumpKey||(this._jumpKeyHeldSinceJumpStart=!1),this._timeSinceCurrentJumpStart+=e,i._requestedDeltaY-=this._currentJumpSpeed*e,this._jumpKeyHeldSinceJumpStart&&this._timeSinceCurrentJumpStart<i._jumpSustainTime||(this._currentJumpSpeed-=i._gravity*e),this._currentJumpSpeed<0&&i._setFalling()}toString(){return"Jumping"}}class Y{constructor(e){this._grabbedPlatform=null;this._behavior=e}enter(e){this._grabbedPlatform=e,this._behavior._canJump=!0,this._behavior._currentFallSpeed=0}leave(){this._grabbedPlatform=null}beforeUpdatingObstacles(e){}checkTransitionBeforeX(){const e=this._behavior;e._isIn(e._potentialCollidingObjects,this._grabbedPlatform.owner.id)||e._releaseGrabbedPlatform()}beforeMovingX(){const e=this._behavior;e._requestedDeltaX=this._grabbedPlatform.owner.getX()-this._grabbedPlatformLastX,e._requestedDeltaY=this._grabbedPlatform.owner.getY()-this._grabbedPlatformLastY}checkTransitionBeforeY(e){const t=this._behavior;t._checkTransitionOnLadder(),t._releasePlatformKey&&t._releaseGrabbedPlatform(),t._checkTransitionJumping()}beforeMovingY(e,t){this._grabbedPlatformLastX=this._grabbedPlatform.owner.getX(),this._grabbedPlatformLastY=this._grabbedPlatform.owner.getY()}toString(){return"GrabbingPlatform"}}class y{constructor(e){this._behavior=e}enter(){this._behavior._canJump=!0,this._behavior._currentFallSpeed=0}leave(){}beforeUpdatingObstacles(e){}checkTransitionBeforeX(){}beforeMovingX(){}checkTransitionBeforeY(e){const t=this._behavior;t._isOverlappingLadder()||t._setFalling(),t._checkTransitionJumping(),t._releaseLadderKey&&t._releaseLadder()}beforeMovingY(e,t){const i=this._behavior;i._upKey&&(i._requestedDeltaY-=i._ladderClimbingSpeed*e),i._downKey&&(i._requestedDeltaY+=i._ladderClimbingSpeed*e)}toString(){return"OnLadder"}}const p=class{constructor(){this.ownerMinX=0;this.ownerMaxX=0;this.headMinY=0;this.ownerMinY=0;this.headMaxY=0;this.floorMinY=0;this.ownerMaxY=0;this.floorMaxY=0;this.allowedMinDeltaY=0;this.allowedMaxDeltaY=0;this.foundOverHead=!1;this.foundUnderBottom=!1}initializeBeforeSearch(e,t,i){let o=Number.MAX_VALUE,r=-Number.MAX_VALUE,a=Number.MAX_VALUE,s=-Number.MAX_VALUE;for(const _ of e.owner.getHitBoxes())for(const l of _.vertices)o=Math.min(o,l[0]),r=Math.max(r,l[0]),a=Math.min(a,l[1]),s=Math.max(s,l[1]);this.ownerMinX=o,this.ownerMaxX=r,this.headMinY=a+t,this.ownerMinY=a,this.headMaxY=a+i,this.floorMinY=s+t,this.ownerMaxY=s,this.floorMaxY=s+i,this.allowedMinDeltaY=t,this.allowedMaxDeltaY=Number.MAX_VALUE}initializeBeforeHitboxCheck(){this.foundOverHead=!1,this.foundUnderBottom=!1}revertTo(e,t){this.allowedMinDeltaY=e,this.allowedMaxDeltaY=t}setFloorIsTooHigh(){this.allowedMinDeltaY=Number.MAX_VALUE,this.allowedMaxDeltaY=-Number.MAX_VALUE}floorIsTooHigh(){return this.allowedMinDeltaY>this.allowedMaxDeltaY}isCollidingAnyPlatform(){return this.ownerMaxY+this.allowedMaxDeltaY<=this.floorMaxY}getFloorDeltaY(){return this.allowedMaxDeltaY}addPointConstraint(e){if(e<this.floorMinY){if(e>this.headMaxY){this.setFloorIsTooHigh();return}if(this.foundOverHead=!0,this.foundUnderBottom){this.setFloorIsTooHigh();return}this.allowedMinDeltaY=Math.max(this.allowedMinDeltaY,e-this.ownerMinY)}else{if(this.foundUnderBottom=!0,this.foundOverHead){this.setFloorIsTooHigh();return}this.allowedMaxDeltaY=Math.min(this.allowedMaxDeltaY,e-this.ownerMaxY)}}};let c=p;c.instance=new p,n.registerBehavior("PlatformBehavior::PlatformerObjectBehavior",n.PlatformerObjectRuntimeBehavior)})(gdjs||(gdjs={}));
//# sourceMappingURL=platformerobjectruntimebehavior.js.map
