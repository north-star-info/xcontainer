import { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');

  const [modules, setModules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingCode, setEditingCode] = useState('// write your script here');
  const [runOutput, setRunOutput] = useState('');
  const [runError, setRunError] = useState('');

  const [modulesRunOutput, setModulesRunOutput] = useState('');
  const [modulesRunError, setModulesRunError] = useState('');

  // shared glow style (70% green, 30% blue)
  const glow = {
    shadowColor: '#00CC88',
    shadowOpacity: 0.45,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 6 },
  };

  function goHome() {
    setScreen('home');
  }

  function goModules() {
    setScreen('modules');
  }

  function goEditor() {
    setScreen('editor');
  }

  function goApps() {
    setScreen('apps');
  }

  function goSettings() {
    setScreen('settings');
  }

  function startNewModule() {
    setEditingId(null);
    setEditingName('');
    setEditingCode('// write your script here');
    setRunOutput('');
    setRunError('');
    setScreen('editor');
  }

  function editExistingModule(mod) {
    setEditingId(mod.id);
    setEditingName(mod.name);
    setEditingCode(mod.code);
    setRunOutput('');
    setRunError('');
    setScreen('editor');
  }

  function saveModule() {
    if (!editingName.trim()) return;

    if (editingId) {
      setModules((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, name: editingName.trim(), code: editingCode }
            : m
        )
      );
    } else {
      const newModule = {
        id: Date.now().toString(),
        name: editingName.trim(),
        code: editingCode,
      };
      setModules((prev) => [...prev, newModule]);
      setEditingId(newModule.id);
    }

    setScreen('modules');
  }

  function runScript() {
    setRunOutput('');
    setRunError('');
    try {
      // Prototype of what Swift will later do with a JS engine
      // eslint-disable-next-line no-eval
      const result = eval(editingCode);
      setRunOutput(String(result));
    } catch (e) {
      setRunError(String(e));
    }
  }

  function runModule(mod) {
    setModulesRunOutput('');
    setModulesRunError('');
    try {
      // Prototype runner for a saved module
      // eslint-disable-next-line no-eval
      const result = eval(mod.code);
      setModulesRunOutput(`${mod.name}: ${String(result)}`);
    } catch (e) {
      setModulesRunError(`${mod.name}: ${String(e)}`);
    }
  }

  function resetModules() {
    setModules([]);
    setEditingId(null);
    setEditingName('');
    setEditingCode('// write your script here');
    setRunOutput('');
    setRunError('');
    setModulesRunOutput('');
    setModulesRunError('');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#050505' }}>
      {/* MAIN CONTENT */}
      <View style={{ flex: 1, padding: 20 }}>

        {/* HOME – intro + buttons */}
        {screen === 'home' && (
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>
                XContainer
              </Text>
              <Text style={{ color: 'gray', marginTop: 6, fontSize: 14 }}>
                A small container for your scripts and modules.
              </Text>
              <Text style={{ color: '#777', marginTop: 10, fontSize: 13 }}>
                Modules: {modules.length}
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={goModules}
                style={{
                  backgroundColor: '#0b0b0b',
                  padding: 16,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...glow,
                }}
              >
                <View>
                  <Text style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>
                    Open Modules
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 13 }}>
                    View and manage your symbolic modules.
                  </Text>
                </View>
                <Text style={{ color: '#e0e0e0', fontSize: 20 }}>▦</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={startNewModule}
                style={{
                  backgroundColor: '#111111',
                  padding: 16,
                  borderRadius: 14,
                  borderColor: '#2f2f2f',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...glow,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 4,
                    }}
                  >
                    Create Script
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 13 }}>
                    Start a new module with custom code.
                  </Text>
                </View>
                <Text style={{ color: '#e0e0e0', fontSize: 20 }}>✎</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={goApps}
                style={{
                  backgroundColor: '#0b0b0b',
                  padding: 16,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...glow,
                }}
              >
                <View>
                  <Text style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>
                    Recommended Apps
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 13 }}>
                    Tools similar to XContainer.
                  </Text>
                </View>
                <Text style={{ color: '#e0e0e0', fontSize: 20 }}>⌁</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={goSettings}
                style={{
                  backgroundColor: '#0b0b0b',
                  padding: 16,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...glow,
                }}
              >
                <View>
                  <Text style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>
                    Settings
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 13 }}>
                    App info and module controls.
                  </Text>
                </View>
                <Text style={{ color: '#e0e0e0', fontSize: 20 }}>⚙︎</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* MODULES – sleek symbolic cards */}
        {screen === 'modules' && (
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 26, marginBottom: 10 }}>
              Modules
            </Text>

            <ScrollView style={{ flex: 1 }}>
              {modules.length === 0 && (
                <Text style={{ color: 'gray', marginTop: 8 }}>
                  No modules yet. Create one from Home or tap the + button.
                </Text>
              )}

              {modules.map((m) => (
                <View
                  key={m.id}
                  style={{
                    backgroundColor: '#080808',
                    padding: 14,
                    borderRadius: 14,
                    marginBottom: 10,
                    borderColor: '#262626',
                    borderWidth: 1,
                    ...glow,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 17 }}>{m.name}</Text>
                    <Text style={{ color: '#888', fontSize: 18 }}>□</Text>
                  </View>

                  <Text
                    style={{ color: '#777', marginTop: 6, fontSize: 12 }}
                    numberOfLines={2}
                  >
                    {m.code}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'flex-end',
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => runModule(m)}
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        borderColor: '#3a3a3a',
                        borderWidth: 1,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 13 }}>Run</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => editExistingModule(m)}
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        borderColor: '#3a3a3a',
                        borderWidth: 1,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 13 }}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {modulesRunOutput !== '' && (
              <View
                style={{
                  backgroundColor: '#081826',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#9be7ff', fontWeight: 'bold', fontSize: 13 }}>
                  Module output
                </Text>
                <Text style={{ color: 'white', fontSize: 13 }}>{modulesRunOutput}</Text>
              </View>
            )}

            {modulesRunError !== '' && (
              <View
                style={{
                  backgroundColor: '#2a0b0b',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                  <Text style={{ color: '#ff8a80', fontWeight: 'bold', fontSize: 13 }}>
                    Module error
                  </Text>
                  <Text style={{ color: 'white', fontSize: 13 }}>{modulesRunError}</Text>
              </View>
            )}

            {/* Floating + button */}
            <TouchableOpacity
              onPress={startNewModule}
              style={{
                position: 'absolute',
                right: 20,
                bottom: 20,
                backgroundColor: '#111',
                width: 52,
                height: 52,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#2f2f2f',
                borderWidth: 1,
                ...glow,
              }}
            >
              <Text style={{ color: 'white', fontSize: 24, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EDITOR – visible, beginner friendly, actually runs */}
        {screen === 'editor' && (
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>
              Script Editor
            </Text>

            <Text style={{ color: 'gray', marginBottom: 4 }}>Module name</Text>
            <TextInput
              value={editingName}
              onChangeText={setEditingName}
              placeholder="My first module"
              placeholderTextColor="#666"
              style={{
                backgroundColor: '#080808',
                color: 'white',
                padding: 10,
                borderRadius: 10,
                borderColor: '#262626',
                borderWidth: 1,
                marginBottom: 10,
                ...glow,
              }}
            />

            <Text style={{ color: 'gray', marginBottom: 4 }}>Script</Text>
            <TextInput
              value={editingCode}
              onChangeText={setEditingCode}
              multiline
              placeholder="// write your script here"
              placeholderTextColor="#666"
              style={{
                backgroundColor: '#050505',
                color: 'white',
                padding: 10,
                borderRadius: 10,
                borderColor: '#262626',
                borderWidth: 1,
                height: 220,
                textAlignVertical: 'top',
                marginBottom: 10,
                fontFamily: 'System',
                fontSize: 13,
                ...glow,
              }}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              <TouchableOpacity
                onPress={runScript}
                style={{
                  flex: 1,
                  backgroundColor: '#111',
                  padding: 10,
                  borderRadius: 999,
                  borderColor: '#2f2f2f',
                  borderWidth: 1,
                  alignItems: 'center',
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '500' }}>Run</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveModule}
                style={{
                  flex: 1,
                  backgroundColor: '#111',
                  padding: 10,
                  borderRadius: 999,
                  borderColor: '#2f2f2f',
                  borderWidth: 1,
                  alignItems: 'center',
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '500' }}>Save</Text>
              </TouchableOpacity>
            </View>

            {runOutput !== '' && (
              <View
                style={{
                  backgroundColor: '#081826',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#9be7ff', fontWeight: 'bold', fontSize: 13 }}>
                  Output
                </Text>
                <Text style={{ color: 'white', fontSize: 13 }}>{runOutput}</Text>
              </View>
            )}

            {runError !== '' && (
              <View
                style={{
                  backgroundColor: '#2a0b0b',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#ff8a80', fontWeight: 'bold', fontSize: 13 }}>
                  Error
                </Text>
                <Text style={{ color: 'white', fontSize: 13 }}>{runError}</Text>
              </View>
            )}
          </View>
        )}

        {/* APPS – recommendations + summaries */}
        {screen === 'apps' && (
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>
              Recommended Apps
            </Text>

            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  AltStore
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  An alternative app store that lets you sideload apps onto your iOS device using
                  your Apple ID.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  StikDebug
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  A debugging‑focused tool that helps inspect and interact with apps and system
                  behavior in a more technical way.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  LocalDevVPN
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  A local development VPN tool that routes traffic through your own environment for
                  testing and development.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  UTM
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  A virtual machine app that lets you run other operating systems on your device,
                  like desktop‑class environments.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  LiveContainer
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  A container‑style app that lets you run iOS apps without actually installing them!
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#080808',
                  padding: 14,
                  borderRadius: 14,
                  borderColor: '#262626',
                  borderWidth: 1,
                  marginBottom: 10,
                  ...glow,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                  XContainer
                </Text>
                <Text style={{ color: 'gray', fontSize: 13 }}>
                  Your own scripting container: create modules, run custom code, and experiment with
                  a Swift‑inspired design.
                </Text>
              </View>
            </ScrollView>
          </View>
        )}

        {/* SETTINGS */}
        {screen === 'settings' && (
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>
              Settings
            </Text>

            <View
              style={{
                backgroundColor: '#080808',
                padding: 14,
                borderRadius: 14,
                borderColor: '#262626',
                borderWidth: 1,
                marginBottom: 10,
                ...glow,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>
                About XContainer
              </Text>
              <Text style={{ color: 'gray', fontSize: 13 }}>
                Prototype of your scripting container. The final version will be written in Swift,
                using a proper JavaScript engine and real storage.
              </Text>
            </View>

            <TouchableOpacity
              onPress={resetModules}
              style={{
                backgroundColor: '#1a0b0b',
                padding: 14,
                borderRadius: 14,
                borderColor: '#3a1515',
                borderWidth: 1,
                marginBottom: 10,
                ...glow,
              }}
            >
              <Text style={{ color: '#ff8a80', fontSize: 16, marginBottom: 4 }}>
                Reset all modules
              </Text>
              <Text style={{ color: '#ffb3b3', fontSize: 13 }}>
                Clears every saved module and script in this session.
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* BOTTOM NAV – geometric, symbolic */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#000',
          paddingVertical: 12,
          justifyContent: 'space-around',
          borderTopColor: '#151515',
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity onPress={goHome} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#e0e0e0' }}>⧉</Text>
          <Text style={{ color: screen === 'home' ? '#ffffff' : '#777', fontSize: 11 }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goModules} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#e0e0e0' }}>□</Text>
          <Text style={{ color: screen === 'modules' ? '#ffffff' : '#777', fontSize: 11 }}>
            Modules
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goEditor} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#e0e0e0' }}>✎</Text>
          <Text style={{ color: screen === 'editor' ? '#ffffff' : '#777', fontSize: 11 }}>
            Editor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goApps} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#e0e0e0' }}>⌁</Text>
          <Text style={{ color: screen === 'apps' ? '#ffffff' : '#777', fontSize: 11 }}>
            Apps
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goSettings} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#e0e0e0' }}>⚙︎</Text>
          <Text style={{ color: screen === 'settings' ? '#ffffff' : '#777', fontSize: 11 }}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}




