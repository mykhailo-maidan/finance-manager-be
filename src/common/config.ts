import * as yaml from 'yaml'
import * as fs from 'fs'

const buildConfig = () => {
  const configFilePath = process.argv.find(arg => arg.startsWith("--config"));
  const configPath = configFilePath ? configFilePath.split('=')[1] : "config.yaml";
  const configFile = fs.readFileSync(configPath, 'utf8');
  return yaml.parse(configFile);
}

export default buildConfig();