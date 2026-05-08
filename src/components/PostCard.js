import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Botao from './Botao';
import ComentarioBox from './ComentarioBox';

export default function PostCard({
  post,
  onCurtir,
  onComentar,
}) {
  const [comentario, setComentario] = useState('');
  const [comentariosVisiveis, setComentariosVisiveis] =
    useState(false);

  // Reações locais (sem alterar o objeto post)
  const [reacoes, setReacoes] = useState({
    '🔥': 0,
  '😂': 0,
  '😮': 0,
  '👎': 0,
  '😡': 0,
  });

  function enviarComentario() {
    if (!comentario.trim()) return;

    onComentar(post.id, comentario);
    setComentario('');
  }

  function reagir(emoji) {
    setReacoes((prev) => ({
      ...prev,
      [emoji]: prev[emoji] + 1,
    }));
  }

  const emojis = ['🔥', '😂', '😮', '👎', '😡'];

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {post.usuario.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.usuario}>@{post.usuario}</Text>

          <Text style={styles.data}>
            {new Date(post.criadoEm).toLocaleString('pt-BR')}
          </Text>
        </View>
      </View>

      {/* TEXTO */}
      <Text style={styles.texto}>{post.texto}</Text>

      {/* BOTÃO CURTIR ORIGINAL */}
      <Botao
        titulo={`❤️ Curtir (${post.likes})`}
        onPress={() => onCurtir(post.id)}
      />

      {/* REAÇÕES */}
      <View style={styles.reacoesContainer}>
        {emojis.map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={styles.reacaoBotao}
            onPress={() => reagir(emoji)}
          >
            <Text style={styles.reacaoEmoji}>
              {emoji}
            </Text>

            {reacoes[emoji] > 0 && (
              <Text style={styles.reacaoNumero}>
                {reacoes[emoji]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO COMENTÁRIOS */}
      <TouchableOpacity
        style={styles.comentarioToggle}
        onPress={() =>
          setComentariosVisiveis(!comentariosVisiveis)
        }
      >
        <Text style={styles.comentarioToggleTexto}>
          {comentariosVisiveis
            ? 'Ocultar comentários'
            : `Mostrar comentários (${post.comentarios.length})`}
        </Text>
      </TouchableOpacity>

      {/* COMENTÁRIOS */}
      {comentariosVisiveis && (
        <View style={styles.comentariosContainer}>
          <Text style={styles.subtitulo}>
            Comentários
          </Text>

          {post.comentarios.length === 0 ? (
            <Text style={styles.semComentario}>
              Nenhum comentário ainda.
            </Text>
          ) : (
            post.comentarios.map((comentario) => (
              <ComentarioBox
                key={comentario.id}
                comentario={comentario}
              />
            ))
          )}

          {/* INPUT */}
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#9CA3AF"
            value={comentario}
            onChangeText={setComentario}
          />

          <View style={styles.botaoContainer}>
            <Botao
              titulo="Comentar"
              variante="secundario"
              onPress={enviarComentario}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,

    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  usuario: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  data: {
    marginTop: 3,
    fontSize: 12,
    color: '#9CA3AF',
  },

  texto: {
    fontSize: 17,
    lineHeight: 26,
    color: '#1F2937',
    marginBottom: 18,
  },

  /* REAÇÕES */
  reacoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
    marginBottom: 14,
  },

  reacaoBotao: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  reacaoEmoji: {
    fontSize: 20,
  },

  reacaoNumero: {
    marginLeft: 6,
    fontWeight: '700',
    color: '#374151',
  },

  comentarioToggle: {
    marginTop: 4,
  },

  comentarioToggleTexto: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },

  comentariosContainer: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  subtitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  semComentario: {
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
    marginTop: 12,
  },

  botaoContainer: {
    marginTop: 12,
  },
});