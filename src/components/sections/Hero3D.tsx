"use client";

import { useEffect, useRef } from "react";

// --- Types ---
type Point3D = { x: number; y: number; z: number };
type RotatedPoint = Point3D & { nx: number; ny: number; nz: number }; // with normals
type Face = {
    indices: [number, number, number, number]; // Quad indices
    avgZ: number;
    normal: Point3D;
    center: Point3D;
};

export function Hero3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Mouse state
        const mouse = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };

        // --- Configuration ---
        const CONFIG = {
            p: 2,
            q: 3,
            radius: 145,    // Larger radius
            tube: 32,       // Thinner tube
            tubularSegments: 86,
            radialSegments: 16,
            pColor: "hsl(25, 95%, 55%)",   // Orange/Coral
            sColor: "hsl(280, 80%, 60%)",  // Purple
            glassBase: "rgba(255, 255, 255, 0.1)",
        };

        // --- Mesh Generation ---
        const vertices: Point3D[] = [];
        const normals: Point3D[] = [];
        const faces: { a: number, b: number, c: number, d: number }[] = [];

        function generateMesh() {
            // Standard Torus Knot Parametric Equation
            for (let i = 0; i <= CONFIG.tubularSegments; i++) {
                const u = (i / CONFIG.tubularSegments) * Math.PI * 2;

                // Central curve point (p, q knot)
                const cu = Math.cos(u) + 2; // R + r*cos... simplified
                // Actually let's use the standard "pq torus knot" formula
                // r = 2 + cos(q * u / p) -- wait standard is usually:
                // x = r * cos(p * u)
                // y = r * sin(p * u)
                // z = -sin(q * u)
                // But for a thick tube we need Frenet frame...

                // Simplified approach: Coordinate calc adapted for visual match
                const r_knot = 2 + Math.cos(CONFIG.q * u);
                const p_x = r_knot * Math.cos(CONFIG.p * u);
                const p_y = r_knot * Math.sin(CONFIG.p * u);
                const p_z = -Math.sin(CONFIG.q * u);

                // Next point for tangent -> normal calculation
                const u_next = u + 0.01;
                const r_next = 2 + Math.cos(CONFIG.q * u_next);
                const n_x = r_next * Math.cos(CONFIG.p * u_next);
                const n_y = r_next * Math.sin(CONFIG.p * u_next);
                const n_z = -Math.sin(CONFIG.q * u_next);

                // Tangent vector T
                let tx = n_x - p_x, ty = n_y - p_y, tz = n_z - p_z;
                const tl = Math.sqrt(tx * tx + ty * ty + tz * tz);
                tx /= tl; ty /= tl; tz /= tl;

                // Normal N and Binormal B for tube Frame
                // Simple distinct vector to cross with:
                let bx = 0, by = 0, bz = 1;
                if (Math.abs(tz) > 0.99) { bx = 1; bz = 0; } // avoid singularity

                // N = T x B
                let nx = ty * bz - tz * by;
                let ny = tz * bx - tx * bz;
                let nz = tx * by - ty * bx;
                const nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
                nx /= nl; ny /= nl; nz /= nl;

                // Correct B = N x T
                bx = ny * tz - nz * ty;
                by = nz * tx - nx * tz;
                bz = nx * ty - ny * tx;

                // Generate ring of vertices
                for (let j = 0; j <= CONFIG.radialSegments; j++) {
                    const v = (j / CONFIG.radialSegments) * Math.PI * 2;
                    const cx = -CONFIG.tube * Math.cos(v); // invert for better outside normals
                    const cy = CONFIG.tube * Math.sin(v);

                    // P_final = P_curve + cx * N + cy * B
                    const vx = p_x * 80 + (cx * nx + cy * bx); // Scale up knot 
                    const vy = p_y * 80 + (cx * ny + cy * by);
                    const vz = p_z * 80 + (cx * nz + cy * bz);

                    vertices.push({ x: vx, y: vy, z: vz });

                    // Normal is just the radial vector from curve center
                    // n_final = (cx * N + cy * B) normalized
                    let nfx = cx * nx + cy * bx;
                    let nfy = cx * ny + cy * by;
                    let nfz = cx * nz + cy * bz;
                    const nfl = Math.sqrt(nfx * nfx + nfy * nfy + nfz * nfz);
                    normals.push({ x: nfx / nfl, y: nfy / nfl, z: nfz / nfl });
                }
            }

            // Generate Faces (Quads)
            const ringSize = CONFIG.radialSegments + 1;
            for (let i = 0; i < CONFIG.tubularSegments; i++) {
                for (let j = 0; j < CONFIG.radialSegments; j++) {
                    const a = i * ringSize + j;
                    const b = (i + 1) * ringSize + j;
                    const c = (i + 1) * ringSize + (j + 1);
                    const d = i * ringSize + (j + 1);
                    faces.push({ a, b, c, d });
                }
            }
        }

        generateMesh();

        // --- Helpers ---
        function rotate(p: Point3D, rotX: number, rotY: number, rotZ: number): Point3D {
            let { x, y, z } = p;

            // Rotate X
            let cos = Math.cos(rotX), sin = Math.sin(rotX);
            let y2 = y * cos - z * sin;
            let z2 = y * sin + z * cos;
            y = y2; z = z2;

            // Rotate Y
            cos = Math.cos(rotY); sin = Math.sin(rotY);
            let x2 = x * cos + z * sin;
            z2 = -x * sin + z * cos;
            x = x2; z = z2;

            // Rotate Z
            cos = Math.cos(rotZ); sin = Math.sin(rotZ);
            x2 = x * cos - y * sin;
            y2 = x * sin + y * cos;
            x = x2; y = y2;

            return { x, y, z };
        }

        // --- Render Loop ---
        const render = () => {
            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width * 0.65; // Shift right
            const centerY = canvas.height * 0.5;

            // Update rotation ease
            targetRotation.x += (mouse.y * 0.5 - targetRotation.x) * 0.1;
            targetRotation.y += (mouse.x * 0.5 - targetRotation.y) * 0.1;

            const rotX = time * 0.2 + targetRotation.x; // Slower auto-rot
            const rotY = time * 0.3 + targetRotation.y;
            const rotZ = time * 0.1;

            // Transform Vertices & Normals
            const transformedVertices = vertices.map(v => rotate(v, rotX, rotY, rotZ));
            const transformedNormals = normals.map(n => rotate(n, rotX, rotY, rotZ));

            // Process Faces
            const projectedFaces: Face[] = [];

            for (let i = 0; i < faces.length; i++) {
                const { a, b, c, d } = faces[i];
                const vA = transformedVertices[a];
                const vB = transformedVertices[b];
                const vC = transformedVertices[c];
                const vD = transformedVertices[d];

                // Backface Culling
                // Compute face normal from cross product of two edges
                const ux = vB.x - vA.x, uy = vB.y - vA.y, uz = vB.z - vA.z;
                const vx = vD.x - vA.x, vy = vD.y - vA.y, vz = vD.z - vA.z;
                const nx = uy * vz - uz * vy;
                const ny = uz * vx - ux * vz;
                const nz = ux * vy - uy * vx;

                // If normal points away from camera (positive Z in this coordinate system assuming camera at -infinity looking +Z usually, 
                // but standard canvas 2D acts like Z+ is out of screen. Let's check Z component of normal)
                // Actually simpler: check winding order or Z normal.
                if (nz < 0) continue; // cull

                // Average Z for sorting
                const avgZ = (vA.z + vB.z + vC.z + vD.z) / 4;

                // Face Normal for lighting (normalized)
                const nl = Math.sqrt(nx * nx + ny * ny + nz * nz);

                projectedFaces.push({
                    indices: [a, b, c, d],
                    avgZ,
                    normal: { x: nx / nl, y: ny / nl, z: nz / nl },
                    center: { x: (vA.x + vC.x) / 2, y: (vA.y + vC.y) / 2, z: avgZ }
                });
            }

            // Painter's Info Algorithm (Sort by Z far to near)
            projectedFaces.sort((faceA, faceB) => faceA.avgZ - faceB.avgZ);

            // Draw Faces
            projectedFaces.forEach(face => {
                const ids = face.indices;

                // Lighting Calc
                // Lights: 
                // 1. Warm (Orange) from Top-Right
                const l1 = { x: 0.6, y: -0.6, z: 0.5 }; // normalized-ish
                // 2. Cool (Purple) from Left
                const l2 = { x: -0.6, y: 0.2, z: 0.5 };

                const dot1 = Math.max(0, face.normal.x * l1.x + face.normal.y * l1.y + face.normal.z * l1.z);
                const dot2 = Math.max(0, face.normal.x * l2.x + face.normal.y * l2.y + face.normal.z * l2.z);

                // Base Gradient Logic
                // Map normal direction or position to color
                // Let's use position-based gradient like reference (Pink/Purple)
                // Map X/Y to gradient factors

                ctx.beginPath();
                ctx.moveTo(centerX + transformedVertices[ids[0]].x, centerY + transformedVertices[ids[0]].y);
                ctx.lineTo(centerX + transformedVertices[ids[1]].x, centerY + transformedVertices[ids[1]].y);
                ctx.lineTo(centerX + transformedVertices[ids[2]].x, centerY + transformedVertices[ids[2]].y);
                ctx.lineTo(centerX + transformedVertices[ids[3]].x, centerY + transformedVertices[ids[3]].y);
                ctx.closePath();

                // Gradient Fill
                // Create radial gradient on the face to simulate specular/shininess
                const g = ctx.createLinearGradient(
                    centerX + transformedVertices[ids[0]].x,
                    centerY + transformedVertices[ids[0]].y,
                    centerX + transformedVertices[ids[2]].x,
                    centerY + transformedVertices[ids[2]].y
                );

                // Color Mix based on lighting
                // High dot1 -> Orange/Pink
                // High dot2 -> Purple

                // Visual tweak: The image is purple with pink highlights
                const intensity = dot1 * 0.8 + dot2 * 0.5;
                const alpha = 0.85; // Glass opacity

                // Dynamic HSL
                // Hue shift: 280 (Purple) -> 330 (Pink) -> 20 (Orange)
                // Base is Purple (280). Add specular highlight (Pink/White)

                // We'll simplistic fill:
                // base color + light add

                const hue = 280 + (dot1 * 105); // 280 -> 385 (Orange range)
                const light = 40 + (dot1 * 45) + (dot2 * 10); // 40-95% lightness

                // Use gradient for that "ribbed" inner glow look
                // But solid fill is 2D canvas standard for poly.
                // Let's fill with the calculated color
                ctx.fillStyle = `hsla(${hue}, 80%, ${light}%, ${alpha})`;

                // Stroke for definition (wireframe-ish but subtle)
                ctx.strokeStyle = `hsla(${hue}, 90%, ${light + 20}%, 0.3)`;
                ctx.lineWidth = 1;

                ctx.fill();
                ctx.stroke();
            });

            time += 0.01;
            animationFrameId = requestAnimationFrame(render);
        };

        // Handle Resize
        const handleResize = () => {
            if (!containerRef.current || !canvas) return;
            canvas.width = containerRef.current.clientWidth;
            canvas.height = containerRef.current.clientHeight;
        };

        // Handle Mouse
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouse.x = x;
            mouse.y = y;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
