import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

function BuildCircle(x, y, radius, world, viewer, outScreen=500) {
  const { World, Bodies } = Matter;

  this._init = function() {
    const options = {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 1,
      force: {x: 0, y: 0.01},
      density: radius * 0.01,
    };
    this.graphics = [];
    for (let i = 0; i < 3; i++) {
      // const random = Math.random();
      const graphic = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, radius);
      graphic.x = x + (radius*(Math.random()-Math.random()));
      graphic.y = y + (radius*(Math.random()-Math.random()));
      graphic.radius = radius;
      this.graphics.push(graphic);
      viewer.addChild(graphic);
    }
    // this.render = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, radius);
    // this.render.x = x;
    // this.render.y = y;
    // this.physic = Bodies.circle(x, y, radius * Math.random(), options);
    this.physic = Bodies.circle(x, y, radius, options);

    // viewer.addChild(...this.graphics);
  }
  this.update = function() {
    const { position, velocity } = this.physic;
    // console.log(velocity)
    // if (Math.abs(velocity.x < 0.5) || Math.abs(velocity.y < 0.5) ) {
      // this.graphics.forEach(graphic => {
      //   const num = (Math.random() - Math.random());
      //   graphic.x = position.x + (graphic.radius * num * velocity.x / 2);
      //   graphic.y = position.y + (graphic.radius * num * velocity.y / 2);
      // })
    // }
    // else {
      this.graphics.forEach(graphic => {
        const num = (Math.random() - Math.random());
        graphic.x = position.x + (graphic.radius/3 * num/5);
        graphic.y = position.y + (graphic.radius/3 * num/5);
      })
    // }
  }
  this._init();
  if (world) {
    World.add(world, this.physic);
  }
  this.isOffScreen = function() {
    return (this.physic.position.y > outScreen + 100);
  }
  this.removeFromWorld = function() {
    World.remove(world, this.physic);
    viewer.removeChild(this.render);
  }
}

export default BuildCircle;