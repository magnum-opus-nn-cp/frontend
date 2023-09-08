import {ReactFCC} from '../../../../utils/ReactFCC';
import {EntityType, Question} from '../../../../api/deck';
import {Form} from '../../../../components/Form';
import {ChatFormText} from './components/ChatFormText';
import {ChatFormSelect} from './components/ChatFormSelect';
import {ChatFormMultipleRange, RangeType} from './components/ChatFormMultipleRange';
import {ChatFormMultipleDateDescription} from './components/ChatFormMultipleDateDescription';
import {ChatFormRange} from './components/ChatFormRange';
import {ChatFormMultipleLinkDescription} from './components/ChatFormMultipleLinkDescription';
import {ChatFormPhotoDescription} from './components/ChatFormPhotoDescription';
import {ChatFormMultiplePhoto} from './components/ChatFormMultiplePhoto';
import {ChatFormMultiplePhotoDescription} from './components/ChatFormMultiplePhotoDescription';

export interface QuestionFactoryProps {
  type: EntityType;
  params: Question['params'];
  onSubmit: (data: any) => void;
  hint?: Question['hint'];
}

export const QuestionFactory: ReactFCC<QuestionFactoryProps> = (props) => {
  const {type, params, onSubmit, hint} = props;

  switch (type) {
    case EntityType.text:
      return (
        <Form>
          {({ handleSubmit, register, setValue }) => (
            <ChatFormText
              type={'textarea'}
              registration={register('value', {
                required: true,
                maxLength: params?.max_length
              })}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(val) => setValue('value', val)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.number:
      return (
        <Form>
          {({ handleSubmit, register, setValue }) => (
            <ChatFormText
              type={'number'}
              registration={register('value', {
                required: true,
                maxLength: params?.max_length
              })}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(val) => setValue('value', val)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.date:
      return (
        <Form>
          {({ handleSubmit, register, setValue }) => (
            <ChatFormText
              type={'date'}
              registration={register('value', {
                required: true,
                maxLength: params?.max_length
              })}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(val) => setValue('value', val)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.link:
      return (
        <Form>
          {({ handleSubmit, register, setValue }) => (
            <ChatFormText
              type={'text'}
              registration={register('value', {
                required: true,
                maxLength: params?.max_length
              })}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(val) => setValue('value', val)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.select:
      return (
        <Form>
          {({ handleSubmit, register, control }) => (
            <ChatFormSelect
              registration={register('value', { required: true })}
              control={control}
              options={params?.options || []}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Form>
      );
    case EntityType.multiple_range:
      return (
        <Form options={{
          values: {
            value: {
              ...(params?.scrollbars || []).reduce((acc: any, i: RangeType) => {
                acc[i.slug] = i.min_value;
                return acc;
              }, {})
            }
          }
        }}>
          {({ handleSubmit, register, control, setValue }) => (
            <ChatFormMultipleRange
              registration={register('value', { required: true })}
              control={control as any}
              scrollbars={params?.scrollbars || []}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(value) => setValue('value', value)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.multiple_date_description:
      return (
        <Form options={{
          values: {
            value: {
              [new Date().toISOString()]: '',
            }
          }
        }}>
          {({ handleSubmit, register, control, setValue }) => (
            <ChatFormMultipleDateDescription
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(value) => setValue('value', value)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.range:
      return (
        <Form options={{
          values: {
            value: params?.min_value ?? 0
          }
        }}>
          {({ handleSubmit, register, control, setValue }) => (
            <ChatFormRange
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(value) => setValue('value', value)}
              hint={hint}
              range={params as RangeType}
            />
          )}
        </Form>
      )
    case EntityType.multiple_link_description:
      return (
        <Form options={{
          values: {
            value: {
              'Ссылка': '',
            }
          }
        }}>
          {({ handleSubmit, register, control, setValue }) => (
            <ChatFormMultipleLinkDescription
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
              setValue={(value) => setValue('value', value)}
              hint={hint}
            />
          )}
        </Form>
      )
    case EntityType.photo_description:
      return (
        <Form options={{
          values: {
            value: {
              file: null,
              text: '',
            }
          }
        }}>
          {({ handleSubmit, register, control }) => (
            <ChatFormPhotoDescription
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Form>
      );
    case EntityType.multiple_photo:
      return (
        <Form options={{
          values: {
            value: {}
          }
        }}>
          {({ handleSubmit, register, control }) => (
            <ChatFormMultiplePhoto
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Form>
      );
    case EntityType.multiple_photo_description:
      return (
        <Form options={{
          values: {
            value: []
          }
        }}>
          {({ handleSubmit, register, control }) => (
            <ChatFormMultiplePhotoDescription
              registration={register('value', { required: true })}
              control={control as any}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Form>
      );
    default:
      return null;
  }
};

