import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const API_BASE_URL = "http://192.168.1.103:5000"; // Backend API base URL

const NotApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const [optionsModalVisible, setOptionsModalVisible] = useState(false); // Done / Not done / Edit
  const [editModalVisible, setEditModalVisible] = useState(false);       // TextInput + Kaydet

  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");


  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("Fetch tasks error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const addTask = async () => {
    if (!newTitle.trim()) return;

    try {
      await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      setNewTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Add task error:", err);
    }
  };


  const completedTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      fetchTasks();
    } catch (err) {
      console.log("Complete task error:", err);
    }
  };

  const notCompletedTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false }),
      });
      fetchTasks();
    } catch (err) {
      console.log("Not complete task error:", err);
    }
  };


  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (err) {
      console.log("Delete task error:", err);
    }
  };

  const renderRightActions = (id) => (
    <View style={styles.deleteButton}>
      <Text style={styles.deleteText} onPress={() => deleteTask(id)}>
        Delete
      </Text>
    </View>
  );


  const updateTaskTitle = async () => {
    if (!selectedTask || !editTitle.trim()) {
      setEditModalVisible(false);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/tasks/${selectedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle }),
      });

      setEditModalVisible(false);
      setSelectedTask(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Update task title error:", err);
    }
  };

  
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <Pressable
          style={{ padding: 5, borderRadius: 10 }}
          onLongPress={() => {
            // Uzun basınca bu task seçilir ve seçenek modali açılır
            setSelectedTask(item);
            setOptionsModalVisible(true);
          }}
        >
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubtitle}>
            {item.completed ? "✅ Done" : "⏳ Not done"}
          </Text>
        </Pressable>
      </Swipeable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      {/* Yeni görev input'u */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="New task title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* Görev listesi */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

  
      <Modal
        visible={optionsModalVisible && !!selectedTask}
        transparent
        animationType="fade"
        onRequestClose={() => setOptionsModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Seçilen Görev:
            </Text>
            <Text style={{ marginBottom: 20 }}>
              {selectedTask?.title}
            </Text>

            {/* DONE */}
            <Pressable
              onPress={() => {
                if (selectedTask) completedTask(selectedTask.id);
                setOptionsModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>✅ Done</Text>
            </Pressable>

            {/* NOT DONE */}
            <Pressable
              onPress={() => {
                if (selectedTask) notCompletedTask(selectedTask.id);
                setOptionsModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>⏳ Not done</Text>
            </Pressable>

            {/* EDIT */}
            <Pressable
              onPress={() => {
                if (selectedTask) {
                  setEditTitle(selectedTask.title); // mevcut başlığı inputa koy
                  setEditModalVisible(true);        // edit modalını aç
                  setOptionsModalVisible(false);    // seçenek modalını kapat
                }
              }}
            >
              <Text style={styles.optionText}>✏️ Edit</Text>
            </Pressable>

            {/* CANCEL */}
            <Pressable
              onPress={() => {
                setOptionsModalVisible(false);
                setSelectedTask(null);
              }}
            >
              <Text style={styles.optionText}>❌ Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

     
      <Modal
        visible={editModalVisible && !!selectedTask}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Görevi Düzenle
            </Text>

            <TextInput
              style={styles.editInput}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Yeni başlık"
            />

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Button title="Kaydet" onPress={updateTaskTitle} />
              <Button
                title="Vazgeç"
                color="gray"
                onPress={() => {
                  setEditModalVisible(false);
                  setEditTitle("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotApp />
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  taskItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 80,
    borderRadius: 10,
  },
  deleteText: {
    color: "white",
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
  },
});
