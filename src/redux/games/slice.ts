import { fetchData } from '@/api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface GameState {
  games: any[];
  isLoading: boolean;
  error: string | null; // Replace 'any' with a more specific type if available
}

const initialState: GameState = {
  games: [],
  isLoading: true,
  error: null,
};

const handleFetchGames = createAsyncThunk(
  'games/handleFetchGames',
  async () => {
    try {
      return fetchData(`/api/games`);
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleFetchGames.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.games = [];
    });
    builder.addCase(handleFetchGames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
      state.error = null;
    });
    builder.addCase(handleFetchGames.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch games';
      state.games = [];
    });
  },
  reducers: {},
});

export default gamesSlice.reducer;
