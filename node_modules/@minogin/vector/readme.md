```javascript
// Calculate
let a = new Vector(10, 20)  
let b = new Vector(30, 40)
let c = a.add(b).rotate(Vector.rad(30)) 

// Use
console.log('x: ' + c.x)    
console.log('y: ' + c.y)
console.log('length: ' + c.norm())
console.log('angle in degrees: ' + Vector.deg(c.angle()))
```

# Description
2D-vector operations: addition, subtraction, normalization, rotation etc.

The vectors are immutable and therefore safe to use. Every operation returns new instance.

# Installation

Install with npm

```bash
npm i @minogin/vector
```

Add the following line to your javascript code

```javascript
import Vector from '@minogin/vector'
```

# Documentation

## Constructors

### `Vector(x, y)`
* `x`, `y` {`Number`} - initial vector coordinates
```javascript
let v = new Vector(10, -20)
```

### `Vector(v)`
* `v` {`Vector`} - vector to clone
```javascript
let a = new Vector(10, 20)
let b = new Vector(a)       // b = { 10; 20 }
```

## Operators and functions

### `add(v)`

* `v` {`Vector`} - vector to add
* returns: `Vector`
 
Returns sum of current vector and v

```javascript
let a = new Vector(10, 20)
let b = a.add(new Vector(30, 40))   // b = { 40; 60 }
```

### `sub(v)`

* `v` {`Vector`} - vector to subtract
* returns: `Vector`

Returns difference of current vector and v

```javascript
let a = new Vector(30, 40)
let b = a.sub(new Vector(10, 30))   // b = { 20; 10 }
```

### `neg(v)`

* returns: `Vector`

Returns vector negative (inverse) to current

```javascript
let a = new Vector(10, -20)
let b = a.neg()     // a = {-10; 20}
```

### `mul(v)`

* `v` {`Vector`} - vector to multiply by
* returns: `Vector`

Returns dot product of current vector and another  
  
```javascript
let a = new Vector(2, 3)
let p = a.mul(new Vector(4, 5))     // p = 2*4 + 3*5 = 23  
```

### `norm()` 

* returns: `Vector`

Returns norm (length) of current vector

```javascript
let n = new Vector(3, 4).norm()     // n = 5  
```


### `unit()`

* returns: `Vector`

Returns unit vector (length = 1) directed same as current

```javascript
let u = new Vector(5, -5).unit()     // u = { √2/2; -√2/2 }
```

### `rotate(angle)`

* `angle` {`Number`} - angle in radians
* returns: `Vector`

Returns current vector rotated by angle (radians)  

```javascript
let b = new Vector(1, 0).rotate(Math.PI / 6)     // b = { √3/2; 1/2 }
```

**See also:** [`Vector.rad(degrees)`](#vectorraddegrees)

### `angle()`

* returns: `Number`

Computes current vector's angle (to x axis) in radians  

```javascript
let phi = new Vector(Math.sqrt(3)/2, 1/2).angle()     // phi = Math.PI / 6
```

**See also:** [`Vector.deg(radians)`](#vectordegradians)

### `equals(v[, precision])`

* `v` {`Vector`} - vector to compare to  
* `precision` {`Number`} - precision of comparison, defaults to `Number.EPSILON`
* returns: `Boolean`

Checks whether this vector is equal (with given precision) to another.

**Be careful!** `Number.EPSILON` may be too small for most floating point operations. 

```javascript
let v = new Vector(Math.sqrt(3)/2, 1/2).rotate(-Math.PI / 6) 
if (v.equals(new Vector(1, 0))) { /*...*/ }     // May be false!
if (v.equals(new Vector(1, 0), 1e-10)) { /*...*/ }     // It is true
```

### `clone()`

* returns: `Vector`

`v.clone()` is identical to `new Vector(v)`


## Utilities

<a name="#rad"></a>
### `Vector.rad(degrees)`

* `degrees` {`Number`} - angle in degrees  
* returns: `Number`

Converts degrees to radians.  

```javascript
new Vector(10, 20).rotate(Vector.rad(30)) 
```

<a name="#deg"></a>
### `Vector.deg(radians)`

* `radians` {`Number`} - angle in radians  
* returns: `Number`

Converts radians to degrees.  

```javascript
let v = new Vector(Math.sqrt(3)/2, 1/2)
console.log('Vector is rotated by ' + Math.deg(v.angle()) + ' degrees')
````

# License

[ISC](https://opensource.org/licenses/ISC)
