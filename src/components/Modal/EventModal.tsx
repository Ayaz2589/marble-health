"use client";

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onAddEvent: (title: string) => void;
  selectedSlot: { start: Date; end: Date } | null;
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  onAddEvent,
  selectedSlot,
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
    }
  }, [open]);

  const handleAdd = () => {
    if (title.trim() === "") return;
    onAddEvent(title.trim());
    setTitle("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "black", color: "#fff" }}>
        Add New Event
      </DialogTitle>
      <DialogContent sx={{ pt: 8 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Event Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        {selectedSlot && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Start:</strong> {selectedSlot.start.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End:</strong> {selectedSlot.end.toLocaleString()}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#f5f5f5" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "black" }}
        >
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
