import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { 
  Todo, 
  AuthResponse, 
  LoginPayload, 
  SignupPayload, 
  CreateTodoPayload, 
  UpdateTodoPayload 
} from '../types';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({ baseURL: API_BASE });

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTHENTICATION HOOKS

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
      return data;
    }
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/signin', payload);
      return data;
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiClient.post('/auth/forgot-password', { email });
      return data;
    }
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: { token: string; newPassword: string }) => {
      const { data } = await apiClient.post('/auth/reset-password', payload);
      return data;
    }
  });
};

// TODO HOOKS

export const useFetchTodos = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await apiClient.get<Todo[]>('/todos');
      return data;
    },
    enabled: !!token,
    staleTime: 30000 // 30 seconds
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTodoPayload) => {
      const { data } = await apiClient.post<Todo>('/todos', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateTodoPayload & { id: string }) => {
      const { data } = await apiClient.patch<Todo>(`/todos/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
};

export const useFetchSingleTodo = (id: string) => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Todo>(`/todos/${id}`);
      return data;
    },
    enabled: !!token && !!id
  });
};