import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    const res = await fetch('https://connections-api.goit.global/contacts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk('contacts/add', async (contact, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    const res = await fetch('https://connections-api.goit.global/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });
    return await res.json();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    await fetch(`https://connections-api.goit.global/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(c => c.id !== payload);
      });
  },
});

export default contactsSlice.reducer;
