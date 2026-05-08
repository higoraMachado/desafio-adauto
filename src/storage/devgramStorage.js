import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

export async function buscarUsuarios() {
  const dados = await AsyncStorage.getItem(STORAGE_KEYS.USUARIOS);

  return dados ? JSON.parse(dados) : [];
}

export async function cadastrarUsuario(novoUsuario) {
  const usuarios = await buscarUsuarios();

  const usuarioExiste = usuarios.find(
    user => user.email === novoUsuario.email
  );

  if (usuarioExiste) {
    throw new Error('Usuário já cadastrado');
  }

  usuarios.push(novoUsuario);

  await AsyncStorage.setItem(
    STORAGE_KEYS.USUARIOS,
    JSON.stringify(usuarios)
  );
}
export async function login(email, senha) {
  const usuarios = await buscarUsuarios();

  const usuario = usuarios.find(
    user => user.email === email && user.senha === senha
  );

  if (!usuario) {
    throw new Error('Email ou senha inválidos');
  }

  await AsyncStorage.setItem(
    STORAGE_KEYS.USUARIO_LOGADO,
    JSON.stringify(usuario)
  );

  return usuario;
}

export async function buscarUsuarioLogado() {
  const dados = await AsyncStorage.getItem(
    STORAGE_KEYS.USUARIO_LOGADO
  );

  return dados ? JSON.parse(dados) : null;
}

export async function logout() {
  await AsyncStorage.removeItem(
    STORAGE_KEYS.USUARIO_LOGADO
  );
}


export async function salvarPosts(posts) {
  await AsyncStorage.setItem(
    STORAGE_KEYS.POSTS,
    JSON.stringify(posts)
  );
}

export async function buscarPosts() {
  const dados = await AsyncStorage.getItem(
    STORAGE_KEYS.POSTS
  );

  return dados ? JSON.parse(dados) : [];
}

export async function limparTudo() {
  await AsyncStorage.clear();
}
