import * as todoModel from "~~/server/model/todo";

export const read = async () => {
  try {
    return await todoModel.read();
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const create = async (evt) => {
  try {
    const body = await readBody(evt);
    const isExist = await todoModel.details({
      title: body.title,
    });
    if (isExist) {
      throw createError({
        statusCode: 400,
        statusMessage: "Todo already exists with same title",
      });
    }
    return await todoModel.create({
      title: body.title,
      content: body.content,
    });
  } catch (err) {
    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something went wrong",
    });
  }
};

export const update = async (evt) => {
  try {
    const body = await readBody(evt);
    return await todoModel.update(evt.context.params?.id, {
      title: body.title,
      content: body.content,
    });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const markComplete = async (evt) => {
  try {
    return await todoModel.markComplete(evt.context.params?.id);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};

export const remove = async (evt) => {
  try {
    return await todoModel.remove(evt.context.params?.id);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
};
