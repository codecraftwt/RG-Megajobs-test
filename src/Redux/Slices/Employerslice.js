import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../Utils/AxiosInstance';

export const fetchEmployers = createAsyncThunk(
  'employers/fetchEmployers',
  async () => {
    const response = await instance.get(`api/employers`);
    return response.data.user;
  }
);

export const fetchEmployerDetails = createAsyncThunk(
  'employers/fetchEmployerDetails',
  async (id) => {
    try {
      const response = await instance.get(`api/employers/${id}`);
      return response.data.data;
    } catch (error) {
      throw error
    }
  }
);

export const fetchEmployersnameList = createAsyncThunk(
  'employers/fetchEmployersnameList',
  async () => {
    const response = await instance.get(`api/get-employers-list`);
    return response.data.data;
  }
);

const employerSlice = createSlice({
  name: 'employers',
  initialState: {
    employers: [],
    employersNameList: [],
    SavedCompany: [],
    employerDetails:[],
    loading: false,
    error: null,
  },
  reducers: {
    SavedCompany: (state, action) => {
      state.SavedCompany.push(action.payload);
    },
    unSavedCompany: (state, action) => {
      state.SavedCompany = state.SavedCompany.filter(employer => employer.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployers.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
        state.error=null
      })
      .addCase(fetchEmployers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployersnameList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployersnameList.fulfilled, (state, action) => {
        state.loading = false;
        state.employersNameList = action.payload;
        state.error=null
      })
      .addCase(fetchEmployersnameList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.employerDetails = action.payload;
        state.error=null
      })
      .addCase(fetchEmployerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { SavedCompany, unSavedCompany } = employerSlice.actions;
export default employerSlice.reducer;
