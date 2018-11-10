var DEGREE_TO_RAD = Math.PI / 180;

/**
 *  class, representing a circular animation.
 */
class CircularAnimation extends Animation {
    /**
     * @constructor
     */
    constructor(animationId, time, center,radius,startang,rotang) {
        super(animationId,time);
        this.x_center = center[0];
        this.y_center = center[1];
        this.z_center = center[2];
        this.radius = radius;
        this.startang = startang * DEGREE_TO_RAD;
        this.rotang = rotang * DEGREE_TO_RAD;
        this.initAnimation();
        
    }

    initAnimation(){
        this.dist = Math.abs(this.rotang) * this.radius;
        this.speed = this.dist/this.time;
        if(this.rotang > 0){
            this.ang_speed = this.speed / this.radius;
        }
        else{
            this.ang_speed = -this.speed / this.radius;
        }

        this.elapsedTime = 0; //maybe temporary

    }

    /**
     * updates the actual position of the animation
     */
    update(deltaTime){
        
        //maybe temporary, use dist instead of time?
        this.elapsedTime += deltaTime;
        if(this.elapsedTime >= this.time){
            this.terminated = true;
        }

    }

    getMatrix(deltaTime){
        console.log("Lonely");
    }

    apply(deltaTime){
       
        var transform = mat4.create();
        mat4.identity(transform);

        var deltaAng = this.startang + this.ang_speed * deltaTime;
        //mat4.translate(transform,transform,[this.x_center,this.y_center,this.z_center]);
        mat4.rotate(transform, transform, deltaAng, [0, 1, 0]);
        //mat4.translate(transform, transform, [this.radius, 0, 0]);
        
        return transform;
    }
}