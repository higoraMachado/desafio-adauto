import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Animated, TouchableOpacity } from 'react-native';
import { buscarUsuario, salvarUsuario } from '../storage/devgramStorage';

export default function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  // animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // entrada escalonada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    async function verificar() {
      const usuario = await buscarUsuario();
      if (usuario) {
        navigation.replace('Home');
      }
    }

    verificar();
  }, []);

  function animarBotaoPressIn() {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  }

  function animarBotaoPressOut() {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }

  async function entrar() {
    if (!nome.trim() || !turma.trim()) {
      Alert.alert('Atenção', 'Preencha nome e turma.');
      return;
    }

    setLoading(true);

    const usuario = {
      nome,
      turma,
      bio: bio || 'Estudante de React Native',
    };

    await salvarUsuario(usuario);

    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 800);
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

      {/* LOGO (fade simples) */}
      <Text style={styles.logo}>DevGram</Text>
      <Text style={styles.subtitulo}>A rede social da sala</Text>

      {/* FORM (slide + fade) */}
      <Animated.View
        style={[
          styles.form,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >

        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Turma"
          value={turma}
          onChangeText={setTurma}
        />

        <TextInput
          style={[styles.input, styles.bio]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />

        {/* BOTÃO ANIMADO */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.botao}
            onPress={entrar}
            onPressIn={animarBotaoPressIn}
            onPressOut={animarBotaoPressOut}
          >
            <Text style={styles.textoBotao}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7C3AED',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },

  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    elevation: 3,
  },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  bio: {
    height: 80,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});