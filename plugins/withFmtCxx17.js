/**
 * Build the `fmt` pod with C++17.
 *
 * React Native 0.76 ships fmt 11, whose consteval format strings fail to compile
 * with the Xcode 26 toolchain Apple now requires for App Store uploads.
 * Under C++17 fmt skips consteval, so the pod builds cleanly.
 */
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');

const MARKER = '# withFmtCxx17';
const SNIPPET = `
    ${MARKER}
    installer.pods_project.targets.each do |target|
      if target.name == 'fmt'
        target.build_configurations.each do |config|
          config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
        end
      end
    end
`;

module.exports = (config) =>
  withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfile, 'utf8');
      if (!contents.includes(MARKER)) {
        // Append at the end of post_install so it runs after react_native_post_install
        const start = contents.indexOf('post_install do |installer|');
        const end = contents.indexOf('\n  end\n', start);
        contents = contents.slice(0, end) + '\n' + SNIPPET + contents.slice(end);
        fs.writeFileSync(podfile, contents);
      }
      return cfg;
    },
  ]);
