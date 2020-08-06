/**
 * @author Andrey Minogin <minogin@gmail.com>
 */

export default class Vector {
    constructor(x, y) {
        if (x === undefined)
            throw new Error("Must provide at least one parameter")

        if (y === undefined) {
            if (!(x instanceof Vector))
                throw new Error("Single parameter should be a vector")

            this.x = x.x
            this.y = x.y
        }
        else {
            if (typeof x !== 'number' || typeof y !== 'number')
                throw new Error("Must provide numeric parameters")

            this.x = x
            this.y = y
        }
    }

    static zero() {
        return new Vector(0, 0)
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y)
    }

    neg() {
        return new Vector(-this.x, -this.y)
    }

    mul(v) {
        if (typeof v === 'number')
            return new Vector(this.x * v, this.y * v)
        else if (v instanceof Vector)
            return this.x * v.x + this.y * v.y
        else
            throw new Error("Parameter should be a number or a vector")
    }

    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    unit() {
        let norm = this.norm()
        return new Vector(this.x / norm, this.y / norm)
    }

    rotate(angle) {
        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        )
    }

    angle() {
        return Math.atan2(this.y, this.x)
    }

    static _equals(a, b, precision = Number.EPSILON) {
        return Math.abs(a - b) < precision
    }

    equals(v, precision = Number.EPSILON) {
        if (v instanceof Vector)
            return Vector._equals(this.x, v.x, precision) && Vector._equals(this.y, v.y, precision)
        else
            return false
    }

    clone() {
        return new Vector(this)
    }

    static rad(deg) {
        return (deg * Math.PI) / 180
    }

    static deg(rad) {
        return (rad * 180) / Math.PI
    }
}