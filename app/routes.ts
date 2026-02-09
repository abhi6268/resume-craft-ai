import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("upload", "routes/upload.tsx"),
    route("resume/:id", "routes/resume.tsx"),
    route("api/analyze", "routes/api.analyze.ts"),
] satisfies RouteConfig;
