// @gluestack-ui/themed-native-base@0.1.108 is missing multiple component files.
// This script stubs them all out so Metro can bundle.
const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, 'node_modules/@gluestack-ui/themed-native-base/build/components');

const stubs = {
    Stack: "import { View } from 'react-native';\nexport const Stack = View;\n",
    StatusBar:
        "import { StatusBar as RNStatusBar } from 'react-native';\nexport const StatusBar = RNStatusBar;\n",
    Switch: "import { Switch as RNSwitch } from 'react-native';\nexport const Switch = RNSwitch;\n",
    Tabs: "import { View } from 'react-native';\nexport const Tabs = View;\n",
    Text: "import { Text as RNText } from 'react-native';\nexport const Text = RNText;\n",
    Textarea:
        "import { TextInput as RNTextInput } from 'react-native';\nexport const Textarea = RNTextInput;\n",
    Toast: "import { View } from 'react-native';\nexport const Toast = View;\n",
    Tooltip: "import { View } from 'react-native';\nexport const Tooltip = View;\n",
    View: "import { View as RNView } from 'react-native';\nexport const View = RNView;\n",
    VStack: "import { View } from 'react-native';\nexport const VStack = View;\n",
    HStack: "import { View } from 'react-native';\nexport const HStack = View;\n",
    ZStack: "import { View } from 'react-native';\nexport const ZStack = View;\n",
    Icons: {
        index: 'export const Icons = {};\n'
    }
};

for (const [name, content] of Object.entries(stubs)) {
    const dir = path.join(base, name);
    const file = path.join(dir, 'index.js');
    if (!fs.existsSync(file)) {
        fs.mkdirSync(dir, { recursive: true });
        if (typeof content === 'object') {
            for (const [file, c] of Object.entries(content)) {
                fs.writeFileSync(path.join(dir, file), c);
            }
        } else {
            fs.writeFileSync(file, content);
        }
    }
}
