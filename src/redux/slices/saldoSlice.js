import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrlBalance = import.meta.env.VITE_API_URL + "balance";
const apiUrlProfile = import.meta.env.VITE_API_URL + "profile";

export const fetchSaldo = createAsyncThunk("saldo/fetchSaldo", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrlBalance, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.status === 0) {
      return data.data.balance;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProfile = createAsyncThunk("saldo/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(apiUrlProfile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.status === 0) {
      return { name: `${data.data.first_name} ${data.data.last_name}`, profile_image: data.data.profile_image };
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const saldoSlice = createSlice({
  name: "saldo",
  initialState: {
    saldo: null,
    name: null,
    profilePict: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSaldo: (state, action) => {
      state.saldo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaldo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSaldo.fulfilled, (state, action) => {
        state.loading = false;
        state.saldo = action.payload;
      })
      .addCase(fetchSaldo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.profilePict = action.payload.profile_image;
      });
  },
});

export const { setSaldo } = saldoSlice.actions;
export default saldoSlice.reducer;
