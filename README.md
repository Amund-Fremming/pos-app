# pos-app

npx eas-cli login
npx expo-doctor
npx eas-cli init
npx eas-cli build:configure
npx eas-cli build --platform ios # first run: say yes to auto-generate APNs push key
npx eas-cli submit --platform ios --latest
