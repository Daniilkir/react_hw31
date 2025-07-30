import { getContactsApi } from "../api/getContacts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async (thunkAPI) => {
    try {
      const data = await getContactsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch contacts");
    }
  }
);

export const addContact = createAsyncThunk("contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await fetch("https://684ef978f0c9c9848d29bc2c.mockapi.io/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await fetch(`https://684ef978f0c9c9848d29bc2c.mockapi.io/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      return contactId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);


const contactsSlice = createSlice({
  name: "contacts",
  initialState:
  {
    contacts: {
      items: [],
      isLoading: false,
      error: null
    },
    filter: "",
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })


      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(c => c.id !== action.payload);
      })

      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },

});
export default contactsSlice.reducer;
