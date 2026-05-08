import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import Botao from '../components/Botao';
import { cadastrarUsuario, login } from '../storage/devgramStorage';

export default function RegistroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [turma, setTurma] = useState('');
  const [bio, setBio] = useState('');

  async function registrar() {
    if (!nome.trim() || !email.trim() || !senha.trim() || !turma.trim()) {
      Alert.alert('Atenção', 'Preencha nome, email, senha e turma.');
      return;
    }

    if (senha.length < 4) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 4 caracteres.');
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
      turma: turma.trim(),
      bio: bio.trim() || 'Estudante de React Native',
    };

    try {
      await cadastrarUsuario(novoUsuario);

      await login(novoUsuario.email, novoUsuario.senha);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>DevGram</Text>
      <Text style={styles.subtitulo}>Crie sua conta na rede da sala</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Turma"
        value={turma}
        onChangeText={setTurma}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Botao titulo="Cadastrar" onPress={registrar} />

      <Botao
        titulo="Já tenho conta"
        variante="secundario"
        onPress={() => navigation.navigate('Login')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#7C3AED',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
});