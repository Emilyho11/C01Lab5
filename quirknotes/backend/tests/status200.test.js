test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

beforeEach(async () => {
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const allNotes = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(allNotes.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  const title1 = "NoteTitle1";
  const content1 = "NoteContent1";
  const title2 = "NoteTitle2";
  const content2 = "NoteContent2";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const allNotes = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(allNotes.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const title = "Deleting Note Title";
  const content = "Deleting Note Content";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const deleteNoteres = await fetch(
    `${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const deleteNote = await deleteNoteres.json();
  expect(deleteNoteres.status).toBe(200);
  expect(deleteNote.response).toBe(
    `Document with ID ${postNoteBody.insertedId} deleted.`
  );
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const title = "Title - Patching Note";
  const content = "Content - Patching Note";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const patchNoteres = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    }
  );

  const patchNote = await patchNoteres.json();
  expect(patchNoteres.status).toBe(200);
  expect(patchNote.response).toBe(
    `Document with ID ${postNoteBody.insertedId} patched.`
  );
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const title = "Title - Patching Note";
  const content = "Content - Not Patching";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const patchNoteres = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    }
  );

  const patchNote = await patchNoteres.json();
  expect(patchNoteres.status).toBe(200);
  expect(patchNote.response).toBe(
    `Document with ID ${postNoteBody.insertedId} patched.`
  );
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const title = "Title - Not Patching";
  const content = "Content - Patching Content";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const patchNoteres = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    }
  );

  const patchNote = await patchNoteres.json();
  expect(patchNoteres.status).toBe(200);
  expect(patchNote.response).toBe(
    `Document with ID ${postNoteBody.insertedId} patched.`
  );
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const title = "DeleteNoteTitle";
  const content = "DeleteNoteContent";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
  });
  const deleteAllNotes = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotes.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  const title1 = "DeleteNoteTitle1";
  const content1 = "DeleteNoteContent1";
  const title2 = "DeleteNoteTitle2";
  const content2 = "DeleteNoteContent2";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
  });
  const deleteAllNotes = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotes.response).toBe(`2 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const title = "Updating note color - title";
  const content = "Updating note color - Content";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const updateNoteColorRes = await fetch(
    `${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: "#FF0000",
      }),
    }
  );

  const updateNoteColor = await updateNoteColorRes.json();
  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColor.message).toBe("Note color updated successfully.");
});
