[11:19:45.433] Running build in Washington, D.C., USA (East) – iad1
[11:19:45.433] Build machine configuration: 2 cores, 8 GB
[11:19:45.466] Cloning github.com/viralsparkconnect-hue/codastra-next-client (Branch: main, Commit: 6c9a890)
[11:19:45.761] Cloning completed: 295.000ms
[11:19:46.189] Restored build cache from previous deployment (4sYLUqdXcuAS8CUNEv9TjCDhZQK6)
[11:19:46.633] Running "vercel build"
[11:19:47.030] Vercel CLI 47.1.1
[11:19:47.339] Installing dependencies...
[11:19:48.536] 
[11:19:48.537] up to date in 977ms
[11:19:48.537] 
[11:19:48.537] 149 packages are looking for funding
[11:19:48.538]   run `npm fund` for details
[11:19:48.570] Detected Next.js version: 13.4.12
[11:19:48.575] Running "npm run build"
[11:19:48.922] 
[11:19:48.923] > codastra@1.0.0 build
[11:19:48.923] > next build
[11:19:48.923] 
[11:19:49.565] - info Linting and checking validity of types...
[11:19:49.753] - info Creating an optimized production build...
[11:19:49.938] - warn Found lockfile missing swc dependencies, run next locally to automatically patch
[11:19:56.659] Failed to compile.
[11:19:56.659] 
[11:19:56.660] ./pages/portfolio.js
[11:19:56.660] Error: 
[11:19:56.660]   [31mx[0m Unexpected eof
[11:19:56.660]     ,-[[36;1;4m/vercel/path0/pages/portfolio.js[0m:91:1]
[11:19:56.660]  [2m91[0m |       year: 2023,
[11:19:56.660]  [2m92[0m |       status: 'Live',
[11:19:56.660]  [2m93[0m |       visits: '75K+',
[11:19:56.660]  [2m94[0m |       rating: 4.7,
[11:19:56.661]     : [31;1m                  ^[0m
[11:19:56.661]     `----
[11:19:56.661] 
[11:19:56.661] Caused by:
[11:19:56.661]     Syntax Error
[11:19:56.661] 
[11:19:56.661] Import trace for requested module:
[11:19:56.661] ./pages/portfolio.js
[11:19:56.661] 
[11:19:56.662] 
[11:19:56.662] > Build failed because of webpack errors
[11:19:56.691] Error: Command "npm run build" exited with 1
