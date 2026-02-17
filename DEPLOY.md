# Deploy to AWS Amplify (2 minutes)

Your new Vite React app is pushed to GitHub. Connect Amplify to get your live URL.

## Quick steps

1. **Open:** https://console.aws.amazon.com/amplify/home?region=us-east-1#/create

2. **Connect GitHub**
   - Choose **GitHub** → Authorize if needed
   - Select **Satishc746/credit-risk-platform**
   - Branch: **main**
   - Do **not** select monorepo (app is at root)

3. **Build settings** (auto-detected from amplify.yml)
   - Build: `npm install && npm run build`
   - Output: `dist`

4. **Save and deploy** → Wait ~3–5 min

5. **Live URL:** `https://main.xxxxx.amplifyapp.com` (shown in Amplify console)
