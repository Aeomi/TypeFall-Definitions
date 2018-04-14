declare const CLIENT : boolean;
declare const SERVER : boolean;

declare function print(...messages: string[]): void;
declare function printTable(table: object): void;

declare function chip(): Entity;

// StarFall / hooks
declare namespace hook {
    /**
     * Used to attach named callbacks (hooks) to specific events (for event driven code execution)
     * @param eventName Name of the event to 'hook' the callback to
     * @param hookName Unique identifier for the hook being added
     * @param callback The function called whenever the event fires
     */
    function add(eventName: string, hookName: string, callback: Function): void;
    function remove(eventName: string, hookName: string): void;

}

// StarFall / render
declare namespace render {
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawRectOutline(x: number, y: number, width: number, height: number): void;
    function drawRoundedBox(cornerRadius: number, x: number, y: number, width: number, height: number): void;
    function drawRoundedBoxEX(cornerRadius: number, x: number, y: number, width: number, height: number, 
        roundTopLeft: boolean, roundTopRight: boolean, roundBottomLeft: boolean, roundBottomRight: boolean): void;
    function drawSimpleText(x: number, y: number, text: string, xAlignment: any, yAlignment: any): void; //TODO: Figure out type
    function drawText(x: number, y: number, alignment: any): void; //TODO: Figure out type
    function setColor(color: IColor): void;
}

declare interface IFilter {
    (ent: Entity) : boolean
}

declare namespace find {
    function all(filter: IFilter): Entity[];
    function allPlayers(filter: IFilter): Entity[];
    function byClass(className: string, filter: IFilter): Entity[];
    function byModel(model: string, filter: IFilter): Entity[];
    function inBox(corner1: IVector, corner2: IVector, filter: IFilter): Entity[];
    function inCone(pos: IVector, direction: IVector, distance: number, radius: number, filter: IFilter): Entity[]; // TODO: Confirm that direction is a Vector, not an Angle.
    function inSphere(center: IVector, radius: number, filter: IFilter): Entity[];
}

declare interface IScreenIVector {
    x: number,
    y: number,
    visible: true
}

/**
 * Starfall's Vector Type
 */
declare function Vector(x?: number, y?: number, z?:number): IVector;

declare interface IVector {
    x?: number;
    y?: number;
    z?: number;

    add(IVector: IVector): void;
    cross(IVector: IVector): IVector;
    div(IVector: IVector): void;
    dot(IVector: IVector): number;
    getIAngle(): IAngle;
    getDistance(IVector: IVector): number;
    getDistanceSqr(IVector: IVector): number;
    getLength(): number;
    getLength2D(): number;
    getLengthSqr(): number;
    getLength2DSqr(): number;
    getNormalized(): IVector;
    isEqualTol(IVector: IVector, tolerance: Number): boolean;
    isZero(): boolean;
    mul(scalar: number): void;
    normalize(): void;
    rotate(IAngle: IAngle): void;
    rotateAroundAxis(axis: IVector, degrees: number, radians: number): IVector; // TODO: See what can be optionalized here.
    set(IVector: IVector): void;
    setX(x: number): IVector;
    setY(y: number): IVector;
    setZ(z: number): IVector;
    setZero(): void;
    sub(IVector: IVector): void;
    toScreen(): IScreenIVector;
    vdiv(IVector: IVector): void;
    vmul(IVector: IVector): void;
    withinAABox(IVector1: IVector, IVector2: IVector): boolean;
}

/**
 * Starfall's Angle Type
 */
declare function Angle(pitch: number, yaw:number, roll: number): IAngle;

declare class IAngle {
    p: number;
    y: number;
    r: number;
    pitch: number;
    yaw: number;
    roll: number;

    constructor(pitch: number, yaw: number, roll: number);
    
    getForward(): IVector
    getNormalized(): IAngle
    getRight(): IVector
    getUp(): IVector
    isZero(): boolean
    normalize(): void
    rotateAroundAxis(axis: IVector, degrees: number, radians: number): IAngle; // TODO: See what can be optionalized here.
    set(IAngle: IAngle): void;
    setP(pitch: number): IAngle;
    setR(roll: number): IAngle;
    setY(yaw: number): IAngle;
    setZero(): void;
}

/**
 * Starfall's Bass Type
 */
declare interface Bass {
    getFFT(samples: number): number[];
    getLength(): number;
    getTime(): number;
    isOnline(): true;
    isValid(): true;
    pause(): void;
    play(): void;
    setFade(min: number, max: number): void;
    setLooping(loop: boolean): void;
    setPitch(pitch: number): void;
    setPos(pos: IVector): void;
    setTime(time: number): void;
    setVolume(volume: number): void;
    stop(): void;
}

/**
 * Starfall's Color Type
 */

declare function Color(red: number, green: number, blue: number, alpha?: number): IColor;

declare interface IColor {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    v: number;

    // constructor (r: number, g: number, b: number);

    hsvToRGB(): IColor;
    rgbToHSV(): IColor;
    setA(a: number): IColor;
    setB(g: number): IColor;
    setG(b: number): IColor;
    setR(r: number): IColor;
}

/*declare enum CHAN {
    REPLACE,
    AUTO,
    WEAPON,
    VOICE,
    ITEM,
    BODY,
    STREAM,
    STATIC,
    VOICE2,
    VOICE_BASE,
    USER_BASE
}*/

/**
 * Starfall's Entity Type
 */
declare interface Entity {
    addCollisionListener(callback: Function): void;
    applyAngForce(IAngle: IAngle): void;
    applyDamage(damage: number, attacker: Entity, inflictor: Entity): void; // TODO: Verify that attacker and inflictor are, in fact, entities.
    applyForceCenter(force: IVector): void;
    applyForceOffset(force: IVector, offset: IVector): void;
    applyTorque(torque: IVector): void;
    breakEnt(): void;
    emitSound(path: string, level?: number, pitch?: number, channel?: number): void; //TODO: clarify this by interrogating sfex devs
    enableDrag(enable: boolean): void;
    enableGravity(enable: boolean): void;
    enableMotion(enable: boolean): void;
    enableSphere(enable: boolean): void;
    entIndex(): number;
    extinguish(): void;
    getIAngles(): IAngle;
    getIAngleVelocity(): IAngle;
    getIAngleVelocityIAngle(): IAngle;
    getAttachment(index: number): any; // TODO: Figure out how this function returns.
    getAttachmentParent(): number;
    getBoneCount(): number;
    getBoneMatrix(index?: number): VMatrix;
    getBoneName(bone?: number): string;
    getBoneParent(bone?: number): string;
    getBonePosition(bone?:number): any; // TODO: Figure out how this function returns.
    getClass(): string;
    getColor(): IColor;
    getEyeIAngles(): IAngle;
    getEyePos(): IVector; // TODO: Figure out how this returns in the case of the entity being a ragdoll.
    getForward(): IVector;
    getHealth(): number;
    getInertia(): IVector;
    getMass(): number;
    getMassCenter(): IVector;
    getMassCenterW(): IVector;
    getMaterial(): string;
    getMaterials(): any; // TODO: Figure out what this returns.
    getMaxHealth(): number;
    getModel(): string;
    getOwner(): Player;
    getParent(): Entity;
    getPhysicsObject(): PhysObj;
    getPhysicsObjectCount(): number;
    getPhysicsObjectNum(id: number): PhysObj;
    getPhysMaterial(): string; // TODO: Verify this return type.
    getPos(): IVector;
    getRight(): IVector;
    getSkin(): number;
    getSubMaterial(index: number): string;
    getUp(): IVector;
    getVelocity(): IVector;
    getWaterLevel(): number;
    ignite(): void;
    isFrozen(): boolean;
    isNPC(): boolean;
    isOnGround(): boolean;
    isPlayer(): boolean;
    isValid(): boolean;
    isValidPhys(): boolean;
    isVehicle(): boolean;
    isWeapon(): boolean;
    isWeldedTo(): boolean;
    linkComponent(entity: Entity): void;
    localToWorld(IVector: IVector): IVector;
    localToWorldIAngles(IAngle: IAngle): IAngle;
    lookupAttachment(name: string): number; // TODO: Verify the type of name.
    lookupBone(name: string): number;
    manipulateBoneIAngles(id: number, ang: IAngle): void;
    manipulateBonePosition(id: number, pos: IVector): void;
    manipulateBoneScale(id: number, pos: IVector): void;
    obbCenter(): IVector;
    obbCenterW(): IVector;
    obbSize(): IVector;
    remove(): void;
    removeCollisionListener(): void;
    removeTrails(): void;
    setIAngles(IAngle: IAngle): void;
    setBodygroup(id: number, value: number): void;
    setColor(color: IColor): void;
    setDrawShadow(enable: boolean, player: Player): void;
    setDrawShadow(enable: boolean, players: Player[]): void;
    setFrozen(state: boolean): void;
    setHologramMesh(mesh: Mesh): void;
    setHologramRenderBounds(IVector1: IVector, IVector2: IVector): void;
    setHologramRenderMatrix(matrix: VMatrix): void;
    setInertia(inertia: IVector): void;
    setMass(mass: Number): void;
    setMaterial(material: string): void;
    setNocollideAll(enable: boolean): void;
    setNoDraw(disable: boolean): void;
    setParent(parent: Entity, attachment?: string): void;
    setPhysMaterial(material: string): void; // TODO: Verify that material is indeed a string
    setPos(pos: IVector): void;
    setRenderFX(renderfx: number): void;
    setRenderMode(rendermode: number): void;
    setSkin(index: number): void;
    setSolid(solid: boolean): void;
    setSubMaterial(index: number, material: string): void;
    setTrails(startSize: number, endSize: number, length: number, material: string, color: IColor, attachmentID?: number, additive?: boolean): void;
    setVelocity(velocity: IVector): void;
    translateBoneToPhysBone(id: number): number;
    translatePhysBoneToBone(id: number): number;
    unparent(): void; // ? Does this not take any argments? It doesn't according to the docs, anyways.
    worldToLocal(IVector: IVector): IVector;
    worldToLocalIAngles(IAngle: IAngle): IAngle;
}

/**
 * Stub VMatrix Class
 */
declare interface VMatrix {
    // TODO: Populate Stub VMatrix Class
}

/**
 * Stub Player Class
 */
declare interface Player {
    // TODO: Populate Stub Player Class
}

/**
 * Stub PhysObj Class
 */
declare interface PhysObj {
    // TODO: Populate Stub PhysObj Class
}

/**
 * Starfall's Mesh Type
 */
declare interface Mesh {
    // TODO: Verify that there isn't actually anything else that can be done to meshes.
    destroy(): void;
    draw(): void;
}