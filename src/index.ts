import App from './app';

const main = async() => {
  try {
    const app = new App()
    await app.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

(async() => {
  await main()
})();

process.on('uncaughtException', error => {
  console.log('uncaughtException', error)
  process.exit(1);
})

process.on('UnhandledPromiseRejectionWarning', error => {
  console.log('uncaughtException', error)
  process.exit(1);
})